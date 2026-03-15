"use client";

import Hero from "@/components/HeroMotion";
// import { getServerSession } from "next-auth"
// import { redirect } from "next/navigation"

export default function Home() {

  // const session = await getServerSession()

  // if (session) {
  //   redirect("/notes")
  // }

  return (
    <Hero/>
  )
}