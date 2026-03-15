import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const pocketToken = process.env.POCKETHOST_TOKEN
const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`;
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params; // ต้อง await params ก่อน

    const session: any = await getServerSession(authOptions)

    if (!session || !session.token) {
      return Response.json({ items: [] }, { status: 401 })
    }

    const res = await fetch(
      `${pocketNotesUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      }
    )

    if (!res.ok) {
      return Response.json({ items: [] }, { status: res.status })
    }

    const data = await res.json()

    return Response.json(
      // {items: data.items ?? []}
      data
    )

  } catch (error) {

    console.error("API NOTES ERROR:", error)

    return Response.json({
      items: []
    }, { status: 500 })

  }
}




export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params; // ต้อง await params ก่อน

  const session = await getServerSession(authOptions)

  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  await fetch(
    `${pocketNotesUrl}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${pocketToken}`
      }
    }
  )

  return Response.json({ success: true })
}



export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params; // ต้อง await params ก่อน

  const session = await getServerSession(authOptions)

  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await fetch(
    `${pocketNotesUrl}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pocketToken}`
      },
      body: JSON.stringify({
        title: body.title,
        content: body.content
      })
    }
  )

  const data = await res.json()
  return Response.json(data)
}