"use client"

import Editor from "@/components/editor/editor"

import { EditorHeader } from "./editor-header"

export const NoteEditor = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-base border border-stroke-base rounded-lg">
      <EditorHeader id="1" fileTitle="🧠 Life's Biggest Answer" />
      <div className="flex h-full w-full justify-center overflow-y-auto">
        <Editor
          data={{
            title: "🧠 Life's Biggest Answer",
            content: {
              time: new Date().getTime(),
              blocks: [
                {
                  type: "paragraph",
                  data: {
                    text: "Write an amazing docs you are proud of.",
                  },
                },
              ],
            },
          }}
          holder={"id"}
        />
      </div>
    </div>
  )
}
