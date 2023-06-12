import { cn } from "@/utils/cn"
import * as ContextMenu from "@radix-ui/react-context-menu"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Copy, Edit3, MoreHorizontal, Star, Trash2 } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

interface NotesContextMenuProps {
  id: string
  children?: React.ReactNode
  onRename?: () => void
  onDelete?: () => void
  onStar?: () => void
  onCopy?: () => void
}

const CONTEXT_MENU_ITEMS = [
  {
    title: "Rename",
    type: "RENAME",
    icon: <Edit3 className="h-4 w-4" />,
    divider: false,
  },
  {
    title: "Make a Copy",
    type: "COPY",
    icon: <Copy className="h-4 w-4" />,
    divider: false,
  },
  {
    title: "Star",
    type: "STAR",
    icon: <Star className="h-4 w-4" />,
    divider: false,
  },
  {
    title: "Delete",
    type: "DELETE",
    icon: <Trash2 className="h-4 w-4" />,
    divider: true,
    isDanger: true,
  },
]

export const NotesContextMenu = ({
  id,
  children,
  onRename,
  onCopy,
  onDelete,
  onStar,
}: NotesContextMenuProps) => {
  return (
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger className="w-full">{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="z-[999] min-w-[240px] overflow-hidden rounded-md border border-stroke-base bg-front shadow-xl">
          {CONTEXT_MENU_ITEMS.map((item, index) => {
            const onClickFn = {
              RENAME: onRename,
              COPY: onCopy,
              DELETE: onDelete,
              STAR: onStar,
            }

            return (
              <ContextMenu.Item
                onClick={onClickFn[item.type]}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-shade-secondary focus:shadow-none focus-visible:outline-none data-[highlighted]:rounded-none data-[highlighted]:bg-back ",
                  {
                    "border-t border-stroke-base": item.divider,
                    "rounded-t-none": index + 1 === CONTEXT_MENU_ITEMS.length,
                  }
                )}
              >
                {item.icon} <p className="text-sm">{item.title}</p>
              </ContextMenu.Item>
            )
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

export const NotesTripleDotsMenu = ({
  id,
  children,
  onRename,
  onCopy,
  onDelete,
  onStar,
}: NotesContextMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="hidden group-hover:block">
        <IconButton
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <MoreHorizontal className="h-3 w-3" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="z-[999] min-w-[240px] overflow-hidden rounded-md border border-stroke-base bg-front shadow-xl"
        >
          {CONTEXT_MENU_ITEMS.map((item, index) => {
            const onClickFn = {
              RENAME: onRename,
              COPY: onCopy,
              DELETE: onDelete,
              STAR: onStar,
            }

            return (
              <DropdownMenu.Item
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  console.log(item)

                  onClickFn[item.type]()
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-shade-secondary focus:shadow-none focus-visible:outline-none data-[highlighted]:rounded-none data-[highlighted]:bg-back ",
                  {
                    "border-t border-stroke-base": item.divider,
                    "rounded-t-none": index + 1 === CONTEXT_MENU_ITEMS.length,
                  }
                )}
              >
                {item.icon} <p className="text-sm">{item.title}</p>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
