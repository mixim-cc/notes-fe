"use client";

import { useEffect, useState } from "react";
import { useGetNoteQuery } from "@/services/graphql/generated/graphql";

import { cn } from "@/utils/cn";
import { OutputData } from "@editorjs/editorjs";
import { Loader2 } from "lucide-react";

import Editor from "@/components/editor/editor";

import { EditorHeader } from "./editor-header";
import { useSelector } from "@legendapp/state/react";
import { state } from "@/services/state";
import { loadFileContent } from "@/services/state/functions/file-system/load-file-content";
import { editFileContent } from "@/services/state/functions/file-system/edit-file-content";
import _ from "lodash";

export const NoteEditor = () => {
  const fileSystem = useSelector(state.fs.fileSystem);
  const selectedNoteId = useSelector(state.fs.selectedFileId);

  const selectedNote = fileSystem.find((files) => files?.id === selectedNoteId);

  const { data: noteData, isLoading } = useGetNoteQuery(
    { id: String(selectedNote?.synced_id) },
    { enabled: !!selectedNote?.synced_id }
  );

  useEffect(() => {
    if (noteData && selectedNote?.id) {
      loadFileContent({
        id: selectedNote.id,
        content: noteData?.note?.get?.data as unknown as OutputData,
      });
    }
  }, [isLoading, selectedNote?.id]);

  return (
    <div
      key={selectedNote?.id}
      className={cn(
        "auto h-full w-full  overflow-hidden rounded-lg border border-stroke-base bg-base"
      )}
    >
      <div className="sticky top-0 z-50">
        <EditorHeader />
      </div>

      {/* {isInitialLoading && networkStatus === "online" ? (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
        </div>
      ) : ( */}
      {selectedNote?.content || noteData?.note?.get?.data ? (
        <div
          className="flex h-full w-full justify-center overflow-y-auto"
          key={selectedNote?.id}
        >
          <Editor
            id={selectedNote?.id}
            data={{
              title: selectedNote?.title,
              content: (selectedNote?.content ||
                noteData?.note?.get?.data) as OutputData,
            }}
            holder={`editor-${selectedNote?.id}`}
            onChange={(data) => {
              if (
                data?.content &&
                (!_.isEqual(
                  data.content?.blocks,
                  fileSystem.find((f) => f?.id === selectedNoteId)?.content
                    ?.blocks
                ) ||
                  data?.title !==
                    fileSystem.find((f) => f?.id === selectedNoteId)?.title)
              ) {
                editFileContent({
                  title: data.title,
                  content: data?.content as OutputData,
                  id: selectedNoteId,
                });
              }
            }}
          />
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
        </div>
      )}
      {/* )} */}
    </div>
  );
};
