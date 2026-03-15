"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="hidden md:flex px-4 py-2 bg-white text-gray-700 cursor-pointer border border-gray-700 rounded-xl hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-300 active:bg-red-600"
    >
      Sign out
    </button>
  )
}