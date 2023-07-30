"use client";

import { state } from "@/services/state";
import { cn } from "@/utils/cn";
import { useSelector } from "@legendapp/state/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SidebarHeader } from "./sidebar-header";
import { SidebarAdd } from "./sidebar-add";
import { SidebarFileSystem } from "./sidebar-file-system";
import { SidebarFile } from "./sidebar-file";
import { copyFile } from "@/services/state/functions/file-system/copy-file";
import { rename } from "@/services/state/functions/file-system/rename";
import { startImmediateSync } from "@/services/state/functions/sync";
import { useNestedLoad } from "@/services/state/functions/file-system/useNestedLoad";
import { selectFile } from "@/services/state/functions/file-system/select-file";

export const NoteSidebar = () => {
  const [selectedTab, setSelectedTab] = useState<"default" | "journal">(
    "default"
  );

  const isSidebarVisible = useSelector(state.isSidebarVisible);
  const fileSystem = useSelector(state.fs.fileSystem);
  const selectedFileId = useSelector(state.fs.selectedFileId);

  const individualFiles = fileSystem?.filter(
    (f) => !f?.parentId && f?.type === "FILE"
  );
  const journalFolderId = fileSystem?.find(
    (f) => f?.title === "Journal"
  )?.synced_id;
  const journalFiles = fileSystem?.filter(
    (f) => f?.synced_parent_id === journalFolderId && f?.type === "FILE"
  );

  useHotkeys("g + n", () => setSelectedTab("default"), [selectedTab]);
  useHotkeys("g + h", () => setSelectedTab("journal"), [selectedTab]);

  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          layout
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "320px", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className={cn(
            "flex h-full shrink-0 flex-col  gap-4 overflow-y-auto no-scrollbar rounded-lg border border-stroke-base bg-base"
          )}
        >
          <SidebarHeader
            tab={selectedTab}
            onTabChange={(value) => setSelectedTab(value)}
          />
          {selectedTab === "default" && (
            <div className="flex flex-col gap-4 px-4">
              <SidebarAdd />
              <SidebarFileSystem />
              <div className="h-1 w-full border-t border-stroke-base"></div>
              <div>
                {individualFiles?.map((file) => (
                  <React.Fragment key={file?.id}>
                    <SidebarFile
                      id={String(file?.id)}
                      title={file?.title}
                      isSelected={file?.id === selectedFileId}
                      onCopy={() => {
                        copyFile({ id: String(file?.id) });
                      }}
                      onTitleChange={(e) => {
                        rename({ id: String(file?.id), title: e.target.value });
                      }}
                      onTitleBlur={() => {
                        startImmediateSync();
                      }}
                      onFileClick={() => {
                        selectFile({ id: String(file?.id) });
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "journal" && <Journals />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Journals = () => {
  const fileSystem = useSelector(state.fs.fileSystem);
  const selectedFileId = useSelector(state.fs.selectedFileId);

  const journalFolderId = fileSystem?.find((f) => f?.title === "Journal")?.id;

  useNestedLoad({
    parentId: journalFolderId,
    enabled: true,
  });

  const journalFiles = fileSystem?.filter(
    (f) => f?.parentId === journalFolderId && f?.type === "FILE"
  );

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        {journalFiles?.map((file) => (
          <React.Fragment key={file?.id}>
            <SidebarFile
              id={String(file?.id)}
              title={file?.title}
              isSelected={file?.id === selectedFileId}
              onCopy={() => {
                copyFile({ id: String(file?.id) });
              }}
              onTitleChange={(e) => {
                rename({ id: String(file?.id), title: e.target.value });
              }}
              onTitleBlur={() => {
                startImmediateSync();
              }}
              onFileClick={() => {
                selectFile({ id: String(file?.id) });
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
