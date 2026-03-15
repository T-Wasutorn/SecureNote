"use client"

import { useState, useEffect } from "react"
import NoteItem from "./NoteItem"
import NoteModal from "./NoteModal"
// import NoteForm from "./NoteForm"

export default function NoteGrid({ initialNotes }: any) {

  const [notes, setNotes] = useState(initialNotes)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false);

  // อัปเดตเมื่อโหลดหน้าแรกหรือมีการเปลี่ยนหน้า
  useEffect(() => {
    if (initialNotes) {
    setNotes(initialNotes);
  }
  }, [initialNotes])

  const refreshNotes = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms รอให้ Database บันทึกเสร็จจริงๆ

    try{
      const res = await fetch("/api/notes", { 
        cache: "no-store",
        headers: { "Pragma": "no-cache" } // บังคับไม่ให้ใช้ cache ในระดับ network
      });
      
      const data = await res.json();
      if (data.items) {
        setNotes(data.items);
      }
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <>
      {/* <NoteForm onSaveSuccess={refreshNotes} /> */}

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isRefreshing ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>

        {/* add note block */}
        <div
          onClick={() => {
            setEditing(null)
            setOpen(true)
          }}
          className="flex items-center justify-center border-2 border-dashed rounded-lg h-40 cursor-pointer hover:bg-gray-50 text-4xl"
        >
          +
        </div>

        {notes && notes.length > 0 ? (
          notes.map((note: any) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={(n: any) => {
                setEditing(n)
                setOpen(true)
              }}
              refreshNotes={refreshNotes}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            No notes found. (Try refreshing if you just added one)
          </div>
        )}

      </div>

      {open && (
        <NoteModal
          note={editing}
          close={() => setOpen(false)}
          refresh={refreshNotes}
        />
      )}
    </>
  )
}