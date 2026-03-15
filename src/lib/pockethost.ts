const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`;
const pocketRecords = `${pocketBaseUrl}/collections/users/records`;

export async function GET() {

  const res = await fetch(
   pocketNotesUrl
  )

  const data = await res.json()

  return Response.json(data)
}

export async function POST(request: Request) {

 const body = await request.json()

 const res = await fetch(
  pocketNotesUrl,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(body)
  }
 )

 const data = await res.json()

 return Response.json(data)
}