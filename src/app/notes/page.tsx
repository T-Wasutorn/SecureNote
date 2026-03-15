import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import NoteGrid from "@/components/NoteGrid"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "@/components/SignoutButton"
// import { generateDbId } from "@/lib/utils"

const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`;
const pocketRecords = `${pocketBaseUrl}/collections/users/records`;

// สร้างฟังก์ชันดึงข้อมูลตรงจาก PocketHost
async function getNotes(userId: string) {
  const pocketToken = process.env.POCKETHOST_TOKEN;
  const url = `${pocketNotesUrl}?filter=(user_id='${userId}')`;
  
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${pocketToken}` },
    cache: 'no-store'
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}

export default async function NotesPage() {

  const session: any = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const dbId = session.user.dbId
  const notes = await getNotes(String(dbId))

  return (
    <div className="container mx-auto max-w-6xl p-6">

      {/* top section */}
      <section className="mb-10">

        <div className="flex flex-row justify-between gap-4">

          <h1 className="flex flex-ror text-3xl font-bold items-center gap-3">
            Welcome <div className="text-[#F28500]">{session?.user?.name}</div>
          </h1>
          <SignOutButton/>

        </div>

        <p className="text-gray-500 mt-2">
          {notes.length > 0 ? `You have ${notes.length} notes` : "No notes yet"}
        </p>

      </section>

      {/* grid section */}
      <NoteGrid initialNotes={notes} key={notes.length} />

    </div>
  )
}