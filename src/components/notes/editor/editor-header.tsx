import { IconButton } from "@/components/ui/icon-button";
import { state } from "@/services/state";
import { toggleSidebar } from "@/services/state/functions/file-system/toggle-sidebar";
import { useSelector } from "@legendapp/state/react";
import {
  CheckCircle,
  Cloud,
  CloudOff,
  FolderIcon,
  Link,
  Loader2,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Share2,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NotesTripleDotsMenu } from "../context-menu";
import { copyFile } from "@/services/state/functions/file-system/copy-file";
import { useMakeNotePublicMutation } from "@/services/graphql";
import { makePublic } from "@/services/state/functions/file-system/make-public";
import { remove } from "@/services/state/functions/file-system/remove";
import dayjs from "dayjs";

interface EditorHeaderProps {
  title?: string;
  isPreview?: boolean;
}

export const EditorHeader = React.memo(
  ({ title, isPreview }: EditorHeaderProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const isSidebarVisible = useSelector(state.isSidebarVisible);
    const fileSystem = useSelector(state.fs.fileSystem);
    const selectedFile = useSelector(state.fs.selectedFileId);
    const status = useSelector(state.networkStatus);

    const { mutateAsync, isLoading } = useMakeNotePublicMutation();

    const file = fileSystem.find((files) => files?.id === selectedFile);
    const hasParentFolder = !!file?.parentId;

    useHotkeys(
      ["m"],
      () => toggleSidebar(!isSidebarVisible),
      [isSidebarVisible],
      {
        enabled: true,
      }
    );

    useHotkeys(
      ["alt + m", "g + f"],
      () => toggleSidebar(!isSidebarVisible),
      [isSidebarVisible],
      {
        enabled: true,
        enableOnContentEditable: true,
        enableOnFormTags: true,
        preventDefault: true,
      }
    );

    return (
      <div className="flex h-12 items-center justify-between gap-4 border-b border-stroke-base bg-base px-4">
        {" "}
        <div className="flex items-center gap-4">
          <IconButton
            size="sm"
            onClick={() => toggleSidebar(!isSidebarVisible)}
          >
            {isSidebarVisible ? (
              <PanelLeftClose className="text-shade-seondary h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5 text-shade-secondary" />
            )}
          </IconButton>

          <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>

          <div className="flex items-center gap-3">
            {hasParentFolder && !title ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FolderIcon className="text-shade-seondary h-5 w-5" />
                  <p className="text-sm text-shade-secondary">
                    {fileSystem?.find((s) => s?.id === file?.parentId)?.title}
                  </p>
                </div>
                <p className="text-sm text-shade-secondary">/</p>
              </div>
            ) : null}

            <p className="text-sm text-shade-primary">{title || file?.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === "offline" ? (
            <p className="text-xs text-shade-subtle inline-flex items-center gap-2">
              <CloudOff className="h-4 w-4" /> Offline -{" "}
              {file?.lastSyncedDate
                ? dayjs(file?.lastSyncedDate).format("MMM DD, hh:mm a")
                : "Never"}
            </p>
          ) : file?.isSyncing ? (
            <p className="text-xs text-shade-subtle inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />{" "}
              <span>Syncing</span>
            </p>
          ) : (
            <p className="text-xs text-shade-subtle inline-flex items-center gap-2">
              <Cloud className="h-4 w-4 text-green-600" /> Online -{" "}
              {file?.lastSyncedDate
                ? dayjs(file?.lastSyncedDate).format("MMM DD, hh:mm a")
                : "Never"}
            </p>
          )}

          <IconButton size="sm" variant="ghost">
            <Star className="text-shade-seondary h-4 w-4" />
          </IconButton>
          <Popover>
            <PopoverTrigger>
              <IconButton size="sm" variant="ghost">
                <Link className="text-shade-seondary h-4 w-4" />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="bottom"
              className={cn(
                "text-popover-foreground z-50 w-[320px] rounded-md border border-stroke-base bg-base p-3 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 font-medium text-shade-primary">
                  <Share2 className="h-4 w-4" />
                  <p>Share your Draft</p>
                </div>

                <p className="text-sm text-shade-secondary">
                  Share your draft to anyone with public url.
                </p>
                <hr />
                <Input
                  disabled
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                  value={
                    typeof window == "undefined"
                      ? ""
                      : `${location?.origin}/preview?id=${file?.synced_id}`
                  }
                />
                {file?.isPublic ? (
                  <Button
                    isLoading={isLoading}
                    leftIcon={
                      isCopied ? <CheckCircle className="h-4 w-4" /> : null
                    }
                    onClick={async () => {
                      const response = await mutateAsync({
                        id: String(file?.synced_id),
                      });

                      if (response) {
                        const link =
                          typeof window == "undefined"
                            ? ""
                            : `${location?.origin}/preview?id=${file?.synced_id}`;

                        navigator.clipboard.writeText(link);
                        setIsCopied(true);
                      }
                    }}
                  >
                    {!isCopied ? "Copy To Clipboard" : "Copied To Clipboard"}
                  </Button>
                ) : (
                  <Button
                    isLoading={isLoading}
                    onClick={async () => {
                      const response = await mutateAsync({
                        id: String(file?.synced_id),
                      });

                      if (response?.note?.switchPublic) {
                        makePublic({ id: String(file?.id) });
                      }
                    }}
                  >
                    Share your Draft
                  </Button>
                )}

                <p></p>
              </div>
            </PopoverContent>
          </Popover>

          {!isPreview && (
            <NotesTripleDotsMenu
              id="1"
              options={[
                {
                  type: "RENAME",
                  handler: () => {
                    const element = document.getElementById("title");

                    if (element) {
                      element?.focus();
                    }
                  },
                },
                {
                  type: "COPY",
                  handler: () => copyFile({ id: String(file?.id) }),
                },
                {
                  type: "STAR",
                  handler: () => {},
                },
                {
                  type: "DELETE",
                  handler: () => {
                    remove({ id: String(file?.id) });
                  },
                },
              ]}
            >
              <IconButton size="sm" variant="ghost">
                <MoreHorizontal className="text-shade-seondary h-4 w-4" />
              </IconButton>
            </NotesTripleDotsMenu>
          )}
        </div>
      </div>
    );
  }
);

EditorHeader.displayName = "EditorHeader";
