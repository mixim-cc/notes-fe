import { useRouter } from "next/router"
import { useGetNoteQuery } from "@/services/graphql/generated/graphql"
import { cn } from "@/utils/cn"
import { OutputData } from "@editorjs/editorjs"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import Editor from "@/components/editor/editor"
import { EditorHeader } from "@/components/notes/editor/editor-header"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Preview() {
  const router = useRouter()

  const id = router.query["id"] as string

  const { data: noteData, isInitialLoading } = useGetNoteQuery({ id: id }, { enabled: !!id })

  if (isInitialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
      </div>
    )
  }

  return (
    <motion.div layout className="flex h-screen gap-4 bg-base-hover p-4">
      <div className={cn("auto h-full w-full overflow-hidden rounded-lg border border-stroke-base bg-base")}>
        <div className="sticky top-0 z-50">
          <EditorHeader isPreview title={noteData?.note?.get?.title} />
        </div>
        <div className="flex h-full w-full justify-center overflow-y-auto" key={id}>
          <Editor
            id={id}
            data={{
              title: noteData?.note?.get?.title,
              content: noteData?.note?.get?.data as unknown as OutputData,
            }}
            holder={`editor-${id}`}
            isPreview={true}
          />
        </div>
      </div>
    </motion.div>
  )
}
