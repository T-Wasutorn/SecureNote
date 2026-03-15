"use client"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast';

export default function NoteItem({ note, onEdit, refreshNotes }: any) {

  const router = useRouter()

  const deleteNote = async () => {
    const loadingToast = toast.loading("Deleting note...");
    try{
      const res = await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Note deleted!", { id: loadingToast });
          await refreshNotes();
        } else {
          toast.error("Could not delete note", { id: loadingToast });
        }
    } catch(err) {
      toast.error("Something went wrong", { id: loadingToast });
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">

      <h2 className="font-semibold text-lg">
        {note.title}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-3">
        {note.content}
      </p>

      <div className="text-xs text-gray-400 mt-3">
        Updated: {new Date(note.updated).toLocaleString()}
      </div>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => onEdit(note)}
          className="text-sm px-3 py-1 cursor-pointer text-white rounded bg-amber-500 hover:bg-amber-600 active:bg-amber-600 transition-all duration-300"
        >
          Edit
        </button>

        <button
          onClick={deleteNote}
          className="text-sm cursor-pointer px-3 py-1 text-white rounded bg-red-500 hover:bg-red-600 active:bg-red-600 transition-all duration-300"
        >
          Delete
        </button>

      </div>

    </div>
  )
}