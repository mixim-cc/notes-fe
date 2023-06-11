"use client"

import { editFile } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

import Editor from "@/components/editor/editor"

import { EditorHeader } from "./editor-header"

export const NoteEditor = () => {
  const dispatch = useAppDispatch()
  const { structure, selectedFile, isSidebarVisible } = useAppSelector((state) => state.fileExplorerReducer)

  const selectedNote = structure.find((files) => files.id === selectedFile)

  return (
    <div
      key={selectedNote?.id}
      className={cn("h-full w-full overflow-y-auto bg-base border border-stroke-base rounded-lg")}
    >
      <EditorHeader />
      <div className="flex h-full w-full justify-center overflow-y-auto">
        <Editor
          data={{
            title: selectedNote.title,
            content: selectedNote?.content,
          }}
          holder={`editor-${selectedNote.id}`}
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
    </div>
  )
}
