"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast';

export default function NoteModal({ note, close, refresh }: any) {

  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const saveNote = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const method = note ? "PUT" : "POST"
    const url = note ? `/api/notes/${note.id}` : "/api/notes"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      })

      if (res.ok) {
        toast.success(note ? "Updated successfully!" : "Note created!");

        router.refresh(); 
        await refresh(); 
        
        close();
      } else {
        toast.error("Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <form
        onSubmit={saveNote}
        className="bg-white p-6 rounded-lg w-full max-w-md space-y-4"
      >

        <h2 className="text-xl font-semibold">
          {note ? "Edit Note" : "New Note"}
        </h2>

        <input
          name="title"
          id="title"
          className="w-full border p-2 rounded"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          name="content"
          id="content"
          className="w-full border p-2 rounded"
          rows={5}
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={loading}
        />

        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={close}
            className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-50 transition-all duration-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded cursor-pointer transition-all duration-300"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  )
}