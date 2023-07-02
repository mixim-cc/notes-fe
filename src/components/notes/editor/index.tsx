"use client"

import { useEffect } from "react"
import { useGetNoteQuery } from "@/services/graphql/generated/graphql"
import { editFile, loadInitialContent, triggerSync } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { OutputData } from "@editorjs/editorjs"
import { Loader2 } from "lucide-react"

import Editor from "@/components/editor/editor"

import { EditorHeader } from "./editor-header"

export const NoteEditor = () => {
  const dispatch = useAppDispatch()
  const { structure, selectedFile } = useAppSelector((state) => state.fileExplorerReducer)

  const selectedNote = structure.find((files) => files.id === selectedFile)

  const { data, isLoading } = useGetNoteQuery(
    { id: selectedNote?.synced_id },
    { enabled: !!selectedNote?.synced_id }
  )

  useEffect(() => {
    if (data && selectedNote?.id) {
      dispatch(
        loadInitialContent({
          id: selectedNote.id,
          content: data.note.get.data as unknown as OutputData,
        })
      )
    }
  }, [data, dispatch, selectedNote?.id])

  return (
    <div
      key={selectedNote?.id}
      className={cn("auto h-full w-full overflow-hidden rounded-lg border border-stroke-base bg-base")}
    >
      <div className="sticky top-0 z-50">
        <EditorHeader />
      </div>
      {isLoading ? (
        <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
      ) : (
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
              triggerSync()
            }}
          />
        </div>
      )}
    </div>
  )
}
