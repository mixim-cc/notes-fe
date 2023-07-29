import { IconButton } from "@/components/ui/icon-button";
import { state } from "@/services/state";
import { toggleSidebar } from "@/services/state/functions/file-system/toggle-sidebar";
import { useSelector } from "@legendapp/state/react";
import {
  CheckCircle,
  FolderIcon,
  Link,
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

    const { mutateAsync, isLoading } = useMakeNotePublicMutation();

    const file = fileSystem.find((files) => files?.id === selectedFile);
    const hasParentFolder = !!file?.parentId;

    // useHotkeys(
    //   ["m"],
    //   () => toggleSidebar(!isSidebarVisible),
    //   [isSidebarVisible],
    //   {
    //     enabled: true,
    //   }
    // );

    // useHotkeys(
    //   ["alt + m", "g + f"],
    //   () => toggleSidebar(!isSidebarVisible),
    //   [isSidebarVisible],
    //   {
    //     enabled: true,
    //     enableOnContentEditable: true,
    //     enableOnFormTags: true,
    //     preventDefault: true,
    //   }
    // );

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
                {/* <Input
                disabled
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                value={`${location?.origin}/preview?id=${file?.synced_id}`}
              /> */}
                {/* {publicFileIds.includes(file?.id) ? ( */}
                {/* <Button
                isLoading={isLoading}
                leftIcon={isCopied ? <CheckCircle className="h-4 w-4" /> : null}
                onClick={async () => {
                  const response = await mutateAsync({
                    id: String(file?.synced_id),
                  });

                  if (response) {
                    const link = `${location?.origin}/preview?id=${file?.synced_id}`;

                    navigator.clipboard.writeText(link);
                    setIsCopied(true);
                  }
                }}
              >
                {!isCopied ? "Copy To Clipboard" : "Copied To Clipboard"}
              </Button> */}
                {/* ) : (
                <Button
                  isLoading={isLoading}
                  onClick={async () => {
                    const response = await mutateAsync({ id: file?.synced_id });

                    if (response) {
                      dispatch(setPublic({ id: file.id }));
                    }
                  }}
                >
                  Share your Draft
                </Button>
              )} */}

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
                  handler: () => {},
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
