import { FileSystem, NoteType, state } from "@/services/state";
import { useNestedLoad } from "@/services/state/functions/file-system/useNestedLoad";
import { useSelector } from "@legendapp/state/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { SidebarFolder } from "./sidebar-folder";
import React, { useEffect, useState } from "react";
import { SidebarFile } from "./sidebar-file";
import { copyFile } from "@/services/state/functions/file-system/copy-file";
import { rename } from "@/services/state/functions/file-system/rename";
import { startImmediateSync } from "@/services/state/functions/sync";
import { selectFile } from "@/services/state/functions/file-system/select-file";

interface NestedFolderProps {
  parentId: string;
  parentTitle: string;
  depth: number;
}

const NestedChildFolder = ({
  parentId,
  parentTitle,
  depth,
}: NestedFolderProps) => {
  const fileSystem = useSelector(state.fs.fileSystem);

  const { isLoading } = useNestedLoad({
    parentId: String(parentId),
    enabled: !!fileSystem?.find((f) => f?.id === parentId)?.open,
  });

  const childrenNodes = fileSystem?.filter((f) => f?.parentId === parentId);

  return (
    <AccordionItem value={parentId} key={parentId}>
      <AccordionTrigger isLoading={isLoading}>
        <SidebarFolder folderId={parentId} folderTitle={parentTitle} />
      </AccordionTrigger>

      <AccordionContent>
        <div className="pl-4">
          {childrenNodes?.length === 0 ? null : (
            <SidebarStructure
              parentId={parentId}
              depth={depth}
              folders={childrenNodes as FileSystem[]}
            />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

interface SidebarFolderProps {
  folders?: FileSystem[];

  depth?: number;
  parentId?: string;
}

export const SidebarStructure = ({
  folders,
  depth = 0,
  parentId,
}: SidebarFolderProps) => {
  const selectedFileId = useSelector(state.fs.selectedFileId);

  return (
    <Accordion
      type="multiple"
      className="w-full"
      value={folders
        ?.filter((f) => f.depth === depth && f.open)
        ?.map((f) => f.id)}
      onValueChange={(e) => {
        state.fs.fileSystem.set((prev) =>
          prev.map((p) => {
            if (parentId && p.id === parentId) {
              return p;
            }

            return {
              ...p,
              open: e.includes(p.id),
            };
          })
        );
      }}
    >
      {folders?.map((folder) => {
        if (folder.type === "FOLDER") {
          return (
            <React.Fragment key={folder.id}>
              <NestedChildFolder
                depth={depth + 1}
                parentId={folder.id}
                parentTitle={folder.title}
              />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={folder.id}>
            <SidebarFile
              hasParent
              isSelected={selectedFileId === folder?.id}
              title={folder?.title}
              onCopy={() => {
                copyFile({ id: folder.id });
              }}
              onTitleChange={(e) => {
                rename({ id: folder.id, title: e.target.value });
              }}
              onTitleBlur={() => {
                startImmediateSync();
              }}
              onFileClick={() => {
                selectFile({ id: String(folder?.id) });
              }}
            />
          </React.Fragment>
        );
      })}
    </Accordion>
  );
};
