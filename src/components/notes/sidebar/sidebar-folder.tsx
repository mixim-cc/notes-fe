import { addNew } from "@/services/state/functions/file-system/add-new";
import { rename } from "@/services/state/functions/file-system/rename";
import { useRef, useState } from "react";
import { NotesContextMenu } from "../context-menu";
import InlineEditor from "../../inline-editor";
import { FilePlus, FolderPlus } from "lucide-react";
import { remove } from "@/services/state/functions/file-system/remove";

interface SidebarFolderProps {
  folderTitle: string;
  folderId: string;
  depth: number;
}

export const SidebarFolder = ({
  folderTitle,
  folderId,
  depth,
}: SidebarFolderProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const menuOptions = [
    {
      type: "RENAME",
      handler: () => {
        setIsEditing(true);
        if (ref.current) ref.current.focus({ preventScroll: true });
      },
    },
    {
      type: "MAKE_DRAFT",
      handler: () => {
        addNew({
          parentId: folderId,
          title: "📜  Untitled File",
          type: "FILE",
          depth,
        });
      },
    },
    {
      type: "MAKE_FOLDER",
      handler: () => {
        addNew({
          parentId: folderId,
          title: "📂  Untitled Folder",
          type: "FOLDER",
          depth,
        });
      },
    },
    {
      type: "STAR",
      handler: () => {},
    },
    {
      type: "DELETE",
      handler: () => {
        try {
          remove({ id: folderId });
        } catch (e) {
          window.alert(e);
        }
      },
    },
  ];

  return (
    <NotesContextMenu id="2" options={menuOptions}>
      <div className="group flex h-7 w-full flex-1 items-center gap-2 rounded-md px-1 py-4 text-sm font-medium text-shade-primary transition-all hover:bg-el [&[data-state=open]>svg:first-child]:rotate-90">
        <InlineEditor
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          value={folderTitle}
          onChange={(e) => {
            rename({
              id: folderId,
              title: e.target.value,
            });
          }}
          className="w-full resize-none appearance-none  bg-transparent text-ellipsis overflow-hidden text-sm text-shade-primary focus:outline-none"
        />

        <FilePlus
          onClick={(e) => {
            e.preventDefault();
            addNew({
              parentId: folderId,
              title: "📜  Untitled File",
              depth,
              type: "FILE",
            });
          }}
          className="hidden h-4 w-4 shrink-0 cursor-pointer hover:text-shade-primary group-hover:block"
        />
        <FolderPlus
          onClick={(e) => {
            e.preventDefault();
            addNew({
              parentId: folderId,
              title: "📂 Untitled Folder",
              depth,
              type: "FOLDER",
            });
          }}
          className="hidden h-4 w-4 shrink-0 cursor-pointer hover:text-shade-primary group-hover:block"
        />
      </div>
    </NotesContextMenu>
  );
};
