import { SignupForm } from "@/components/SignupForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Signup() {

    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/notes")
    }
    
    return (
        <div className="flex flex-col bg-muted min-h-svh items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    )
}