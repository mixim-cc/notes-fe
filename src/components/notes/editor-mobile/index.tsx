"use client";

import { useEffect } from "react";
import { useGetNoteQuery } from "@/services/graphql/generated/graphql";

import { cn } from "@/utils/cn";
import { OutputData } from "@editorjs/editorjs";
import { Loader2, Plus } from "lucide-react";

import Editor from "@/components/editor-mobile/editor";

import { EditorHeader } from "./editor-header";
import { useSelector } from "@legendapp/state/react";
import { state } from "@/services/state";
import { loadFileContent } from "@/services/state/functions/file-system/load-file-content";
import { editFileContent } from "@/services/state/functions/file-system/edit-file-content";
import _ from "lodash";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addNew } from "@/services/state/functions/file-system/add-new";

export const NoteEditorMobile = () => {
  const fileSystem = useSelector(state.fs.fileSystem);
  const selectedNoteId = useSelector(state.selectedFileId);
  const networkStatus = useSelector(state.networkStatus);
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

  if (!selectedNote) {
    return (
      <div
        className={cn(
          "auto h-full w-full  overflow-hidden rounded-lg border border-stroke-base bg-base flex flex-col gap-4 items-center justify-center"
        )}
      >
        <Image src="/no-note.svg" width={400} height={200} alt="No note" />
        <div className="pt-8 text-xl text-shade-primary">
          No Note Selected. Please Select a note or create.
        </div>{" "}
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => {
              addNew({
                title: "Untitled Note",
                parentId: "",
                type: "FILE",
                depth: 0,
              });
            }}
          >
            New Note
          </Button>
          <Button
            variant="outline"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => {
              addNew({
                title: "Untitled Folder",
                parentId: "",
                type: "FOLDER",
                depth: 0,
              });
            }}
          >
            New Folder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      key={selectedNote?.id}
      className={cn(
        "auto h-full w-full  overflow-hidden rounded-lg border border-stroke-base bg-base"
      )}
    >
      <div className="">
        <EditorHeader />
      </div>

      {networkStatus === "offline" ? (
        <div
          className="flex justify-center w-full h-full overflow-y-auto"
          key={selectedNote?.id}
        >
          <Editor
            id={selectedNote?.id}
            data={{
              title: selectedNote?.title,
              content: selectedNote?.content as OutputData,
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
      ) : isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-10 h-10 text-gray-800 animate-spin" />
        </div>
      ) : (
        <div
          className="flex justify-center w-full h-full overflow-y-auto"
          key={selectedNote?.id}
        >
          <Editor
            id={selectedNote?.id}
            data={{
              title: selectedNote?.title,
              content: noteData?.note?.get?.data as unknown as OutputData,
            }}
            holder={`editor-${selectedNote?.id}`}
            onChange={(data) => {
              if (
                (data?.content &&
                  !_.isEqual(
                    data.content?.blocks,
                    fileSystem.find((f) => f?.id === selectedNoteId)?.content
                      ?.blocks
                  )) ||
                data?.title !==
                  fileSystem.find((f) => f?.id === selectedNoteId)?.title
              ) {
                console.log("OKAY");
                editFileContent({
                  title: data?.title,
                  content: data?.content as OutputData,
                  id: selectedNoteId,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
