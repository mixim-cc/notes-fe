import { cn } from "@/utils/cn";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Copy,
  Edit3,
  FilePlus2,
  FolderPlusIcon,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

type ContextMenuType =
  | "RENAME"
  | "COPY"
  | "STAR"
  | "DELETE"
  | "MAKE_DRAFT"
  | "MAKE_FOLDER";

const checkValidMenu = (menu: string) => {
  return ![
    "RENAME",
    "COPY",
    "STAR",
    "DELETE",
    "MAKE_DRAFT",
    "MAKE_FOLDER",
  ].includes(menu);
};

interface NotesContextMenuProps {
  id: string;
  children?: React.ReactNode;

  options: {
    type: ContextMenuType | string;
    handler?: () => void;
  }[];
}

const CONTEXT_MENU_ITEMS = {
  RENAME: {
    title: "Rename",
    type: "RENAME",
    icon: <Edit3 className="w-4 h-4" />,
    divider: false,
  },
  COPY: {
    title: "Make a Copy",
    type: "COPY",
    icon: <Copy className="w-4 h-4" />,
    divider: false,
  },
  STAR: {
    title: "Star",
    type: "STAR",
    icon: <Star className="w-4 h-4" />,
    divider: false,
  },
  DELETE: {
    title: "Delete",
    type: "DELETE",
    icon: <Trash2 className="w-4 h-4" />,
    divider: true,
    isDanger: true,
  },
  MAKE_DRAFT: {
    title: "Make a Note",
    type: "MAKE_DRAFT",
    icon: <FilePlus2 className="w-4 h-4" />,
    divider: false,
    isDanger: false,
  },
  MAKE_FOLDER: {
    title: "Make Folder",
    type: "MAKE_FOLDER",
    icon: <FolderPlusIcon className="w-4 h-4" />,
    divider: false,
    isDanger: false,
  },
};

export const NotesContextMenu = ({
  children,
  options,
}: NotesContextMenuProps) => {
  return (
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger className="w-full">{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="z-[999] min-w-[240px] overflow-hidden rounded-md border border-stroke-base bg-front shadow-xl">
          {options.map((item, index) => {
            const type = item.type;
            if (checkValidMenu(type)) {
              throw new Error(`${type} Menu is not valid`);
            }
            const menu = CONTEXT_MENU_ITEMS[type as ContextMenuType];

            return (
              <ContextMenu.Item
                key={menu.type}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  item.handler?.();
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-shade-secondary focus:shadow-none focus-visible:outline-none data-[highlighted]:rounded-none data-[highlighted]:bg-back ",
                  {
                    "border-t border-stroke-base": menu.divider,
                    "rounded-t-none": index + 1 === options.length,
                  }
                )}
              >
                {menu.icon} <p className="text-sm">{menu.title}</p>
              </ContextMenu.Item>
            );
          })}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export const NotesTripleDotsMenu = ({
  children,
  options,
}: NotesContextMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        {children || (
          <IconButton
            variant="ghost"
            size="default"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MoreHorizontal className="w-3 h-3" />
          </IconButton>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          className="z-[999] min-w-[240px] overflow-hidden rounded-md border border-stroke-base bg-front shadow-xl"
        >
          {options.map((item, index) => {
            const type = item.type;
            if (checkValidMenu(type)) {
              throw new Error("Menu is not valid");
            }
            const menu = CONTEXT_MENU_ITEMS[type as ContextMenuType];
            return (
              <DropdownMenu.Item
                key={menu.title}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  item.handler?.();
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-shade-secondary focus:shadow-none focus-visible:outline-none data-[highlighted]:rounded-none data-[highlighted]:bg-back ",
                  {
                    "border-t border-stroke-base": menu.divider,
                    "rounded-t-none": index + 1 === options.length,
                  }
                )}
              >
                {menu.icon} <p className="text-sm">{menu.title}</p>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
