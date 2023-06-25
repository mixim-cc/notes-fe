"use client"

import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
import { editFile } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

import Editor from "@/components/editor/editor"

import { EditorHeader } from "./editor-header"

export const NoteEditor = () => {
  const dispatch = useAppDispatch()
  const { data } = useGetNoteFolderStructureQuery()
  const { structure, selectedFile, isSidebarVisible } = useAppSelector((state) => state.fileExplorerReducer)

  const selectedNote = structure.find((files) => files.id === selectedFile)

  console.log(data)

  return (
    <div
      key={selectedNote?.id}
      className={cn("auto h-full w-full overflow-hidden rounded-lg border border-stroke-base bg-base")}
    >
      <>
        <div className="sticky top-0 z-50">
          <EditorHeader />
        </div>
        <div className="flex h-full w-full justify-center overflow-y-auto">
          <Editor
            data={{
              title: selectedNote?.title,
              content: selectedNote?.content,
            }}
            holder={`editor-${selectedNote?.id}`}
            onChange={(data) => {
              dispatch(
                editFile({
                  id: selectedNote?.id,
                  content: data?.content,
                  title: data?.title,
                })
              )
            }}
          />
        </div>
      </>
    </div>
  )
}
