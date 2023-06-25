"use client"

import { useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Oasis } from "@/components/ui/oasis"
import { NoteEditor } from "@/components/notes/editor"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Home() {
  return (
    <>
      <motion.div layout className="flex h-screen gap-4 bg-base-hover p-4">
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </>
  )
}
