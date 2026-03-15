"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NoteForm() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })

    if (res.ok) {
      setTitle("")
      setContent("")
      
      router.refresh(); 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">

      <input
        className="w-full border p-2 rounded"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Note
      </button>

    </form>
  )
}