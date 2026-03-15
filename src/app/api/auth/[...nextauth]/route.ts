import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { generateDbId } from "@/lib/utils"

const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`; 

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        const res = await fetch(
          pocketAuthUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              identity: credentials?.email,
              password: credentials?.password
            })
          }
        )

        const data = await res.json()

        console.log(data.record)

        if (!res.ok) return null

        const record = data.record
        console.log("Record from PocketBase:", record)

        return {
          id: record.id,
          name: record.username,
          email: record.email,
          pocketToken: data.token
        }
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {

    async jwt({ token, user }: any) {

      if (user) {
        token.id = user.id
        token.dbId = generateDbId(user.id, user.email)
        token.pocketToken = user.pocketToken
      }
      return token
    },

    async session({ session, token }: any) {
      session.token = token.pocketToken

      if (session.user) {
        session.user.id = token.id
        session.user.dbId = token.dbId
      }

      return session
    }

  }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }