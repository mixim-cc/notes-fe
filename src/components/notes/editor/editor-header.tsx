import { useState } from "react"
import { useMakeNotePublicMutation } from "@/services/graphql/generated/graphql"
import {
  copyFile,
  deleteFile,
  setPublic,
  toggleSidebarVisibility,
  triggerSync,
} from "@/services/redux/reducers/file-explorer-reducer"
import { useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import {
  CheckCircle,
  FolderIcon,
  Link,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Share,
  Share2,
  Star,
} from "lucide-react"
import { useDispatch } from "react-redux"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/useToast"

import { NotesTripleDotsMenu } from "../context-menu"

interface EditorHeaderProps {
  title?: string
  isPreview?: boolean
}

export const EditorHeader = ({ title, isPreview }: EditorHeaderProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMakeNotePublicMutation()
  const { structure, selectedFile, isSidebarVisible, publicFileIds } = useAppSelector(
    (state) => state.fileExplorerReducer
  )

  const file = structure.find((files) => files.id === selectedFile)
  const hasParentFolder = !!file?.parentId

  return (
    <div className="flex h-12 items-center justify-between gap-4 border-b border-stroke-base bg-base px-4">
      {" "}
      <div className="flex items-center gap-4">
        <IconButton size="sm" onClick={() => dispatch(toggleSidebarVisibility())}>
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
                  {structure?.find((s) => s.id === file?.parentId)?.title}
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
              "z-50 w-[320px] rounded-md border border-stroke-base bg-base p-3 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  font-medium text-shade-primary">
                <Share2 className="w-4 h-4" />
                <p>Share Note</p>
              </div>

              <p className="text-sm text-shade-secondary">Share your note to anyone with public url.</p>
              <hr />
              <Input
                disabled
                className="text-ellipsis whitespace-nowrap overflow-hidden"
                value={`${location.origin}/preview?id=${file.synced_id}`}
              />
              {publicFileIds.includes(file.id) ? (
                <Button
                  isLoading={isLoading}
                  leftIcon={isCopied ? <CheckCircle className="h-4 w-4" /> : null}
                  onClick={async () => {
                    const response = await mutateAsync({ id: file.synced_id })

                    if (response) {
                      const link = `${location.origin}/preview?id=${file.synced_id}`

                      navigator.clipboard.writeText(link)
                      setIsCopied(true)
                    }
                  }}
                >
                  {!isCopied ? "Copy To Clipboard" : "Copied To Clipboard"}
                </Button>
              ) : (
                <Button
                  isLoading={isLoading}
                  onClick={async () => {
                    const response = await mutateAsync({ id: file.synced_id })

                    if (response) {
                      dispatch(setPublic({ id: file.id }))
                    }
                  }}
                >
                  Share Note
                </Button>
              )}

              <p></p>
            </div>
          </PopoverContent>
        </Popover>

        {!isPreview && (
          <NotesTripleDotsMenu
            id="1"
            onRename={() => {
              const element = document.getElementById("title")

              if (element) {
                element?.focus()
              }
            }}
            onCopy={() => {
              dispatch(copyFile(file))
              dispatch(triggerSync())
            }}
            onDelete={() => {
              dispatch(deleteFile({ id: file.id }))
              dispatch(triggerSync())
            }}
            onStar={() => {}}
            trigger={
              <IconButton size="sm" variant="ghost">
                <MoreHorizontal className="text-shade-seondary h-4 w-4" />
              </IconButton>
            }
          />
        )}
      </div>
    </div>
  )
}
