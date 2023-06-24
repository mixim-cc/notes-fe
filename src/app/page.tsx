"use client"

import { motion } from "framer-motion"

import { NoteEditor } from "@/components/notes/editor"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Home() {
  return (
    <motion.div layout className="flex h-screen gap-4 bg-base-hover p-4">
      <NoteSidebar />
      <NoteEditor />
    </motion.div>
  )
}
