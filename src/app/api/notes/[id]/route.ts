export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {

 await fetch(
  `https://app-tracking.pockethost.io/api/collections/notes/records/${params.id}`,
  { method: "DELETE" }
 )

 return Response.json({ success: true })
}