"use client"

import { useEffect } from "react"
import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
import { loadInitalData } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useDispatch } from "react-redux"

import { Oasis } from "@/components/ui/oasis"
import { NoteEditor } from "@/components/notes/editor"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Home() {
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetNoteFolderStructureQuery()
  const { selectedFile } = useAppSelector((state) => state.fileExplorerReducer)

  useEffect(() => {
    if (data?.note?.listAll) dispatch(loadInitalData({ data: data?.note?.listAll }))
  }, [data?.note?.listAll, dispatch, isFetching])

  if (isFetching && !selectedFile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
      </div>
    )
  }

  return (
    <div>
      <motion.div layout className="flex h-screen gap-4 bg-base-hover p-4">
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </div>
  )
}
