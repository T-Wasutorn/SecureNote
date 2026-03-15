const pocketBaseUrl = process.env.POCKETHOST_API_URL;
const pocketAuthUrl = `${pocketBaseUrl}/collections/users/auth-with-password`;
const pocketNotesUrl = `${pocketBaseUrl}/collections/notes/records`;
const pocketRecords = `${pocketBaseUrl}/collections/users/records`;

export async function POST(request: Request) {

  try {
    const body = await request.json()

    if (!body.password || body.password.length < 8) {
      return Response.json(
        {message: "Password must be at least 8 characters long"},
        {status: 400}
      );
    }

    const res = await fetch(
      pocketRecords,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: body.username,
          email: body.email,
          password: body.password,
          passwordConfirm: body.password
        })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      return Response.json(
        { message: data.message || "Email already exists or invalid data" },
        { status: 400 }
      );  
    }

    return Response.json({ success: true })

  } catch(error) {
    return Response.json({message: "Internal Server Error"}, {status: 500})
  }
}