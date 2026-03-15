import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
// import { generateDbId } from "@/lib/utils"

export const dynamic = 'force-dynamic'
export const revalidate = 0
const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`;

export async function GET() {

  const session: any = await getServerSession(authOptions)
  const pocketToken = process.env.POCKETHOST_TOKEN
  const dbId = session.user.dbId
  const url = `${pocketNotesUrl}?filter=(user_id='${dbId}')`

  const res = await fetch(url,
    {
      headers: {
        Authorization: `Bearer ${pocketToken}`
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  )

  const data = await res.json()

  console.log("SESSION:", session)

  return Response.json({ items: data.items ?? [] })
}



export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions)

  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const pocketToken = process.env.POCKETHOST_TOKEN
  const dbId = session.user.dbId

  console.log("Sending to PocketHost with user_id:", dbId)

  const res = await fetch(
    pocketNotesUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${pocketToken}`
      },
      body: JSON.stringify({
        title: body.title,
        content: body.content,
        user_id: dbId
      })
    }
  )

  const data = await res.json()
  return Response.json(data)
}