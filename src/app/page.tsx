import { NoteEditor } from "@/components/notes/editor"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-base-hover p-4 gap-4">
      <NoteSidebar />
      <NoteEditor />
    </div>
  )
}
