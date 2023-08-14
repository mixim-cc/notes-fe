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
import { Drawer } from "vaul";
import { Menu } from "lucide-react";
import { NoteSidebarMobile } from "@/components/notes/sidebar-mobile";

interface EditorHeaderProps {
  title?: string;
  isPreview?: boolean;
}

export const EditorHeader = React.memo(
  ({ title, isPreview }: EditorHeaderProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const isSidebarVisible = useSelector(state.isSidebarVisible);
    const fileSystem = useSelector(state.fs.fileSystem);
    const selectedFile = useSelector(state.selectedFileId);
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
      <div className="flex items-center justify-between h-12 gap-4 px-4 border-b border-stroke-base bg-base">
        {" "}
        <div className="flex items-center gap-4">
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <Menu />
            </Drawer.Trigger>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Portal>
              <Drawer.Content className="bg-gray-100 z-10 w-full flex flex-col rounded-t-[10px] h-full mt-24 max-h-[75%] fixed bottom-0 left-0 right-0">
                <div className="py-4 bg-white rounded-t-[10px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-[14px]" />
                  <div className="mx-auto ">
                    <NoteSidebarMobile />
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>

          <div className="flex items-center gap-3">
            {hasParentFolder && !title ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FolderIcon className="w-5 h-5 text-shade-seondary" />
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
          {/* {status === "offline" ? (
            <p className="inline-flex items-center gap-2 text-xs text-shade-subtle">
              <CloudOff className="w-4 h-4" /> Offline -{" "}
              {file?.lastSyncedDate
                ? dayjs(file?.lastSyncedDate).format("MMM DD, hh:mm a")
                : "Never"}
            </p>
          ) : file?.isSyncing ? (
            <p className="inline-flex items-center gap-2 text-xs text-shade-subtle">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />{" "}
              <span>Syncing</span>
            </p>
          ) : (
            <p className="inline-flex items-center gap-2 text-xs text-shade-subtle">
              <Cloud className="w-4 h-4 text-green-600" /> Online -{" "}
              {file?.lastSyncedDate
                ? dayjs(file?.lastSyncedDate).format("MMM DD, hh:mm a")
                : "Never"}
            </p>
          )} */}

          {/* <IconButton size="sm" variant="ghost">
            <Star className="w-4 h-4 text-shade-seondary" />
          </IconButton>
          <Popover>
            <PopoverTrigger>
              <IconButton size="sm" variant="ghost">
                <Link className="w-4 h-4 text-shade-seondary" />
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
                  <Share2 className="w-4 h-4" />
                  <p>Share your Note</p>
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
                      isCopied ? <CheckCircle className="w-4 h-4" /> : null
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
                    Share your Note
                  </Button>
                )}

                <p></p>
              </div>
            </PopoverContent>
          </Popover> */}

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
                <MoreHorizontal className="w-4 h-4 text-shade-seondary" />
              </IconButton>
            </NotesTripleDotsMenu>
          )}
        </div>
      </div>
    );
  }
);

EditorHeader.displayName = "EditorHeader";
