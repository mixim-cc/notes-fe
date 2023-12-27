import { addNew } from "@/services/state/functions/file-system/add-new";
import { rename } from "@/services/state/functions/file-system/rename";
import { useRef, useState } from "react";
import { NotesContextMenu } from "../context-menu";
import InlineEditor from "../../inline-editor";
import { FilePlus, FolderPlus } from "lucide-react";
import { remove } from "@/services/state/functions/file-system/remove";
import { useSelector } from "@legendapp/state/react";
import { state } from "@/services/state";
import { toast } from "sonner";

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

  const total = useSelector(
    state.fs.fileSystem
      .get()
      .filter((f) => f.parentId === folderId && f.type === "FILE")
  ).length;

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
          title: "Untitled File",
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
          title: "Untitled Folder",
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
          toast.success("Folder has been deleted!");
        } catch (e) {
          window.alert(e);
        }
      },
    },
  ];

  return (
    <NotesContextMenu id="2" options={menuOptions}>
      <div className="group flex h-7 w-full flex-1 items-center justify-between gap-2 rounded-md px-1 py-4 text-sm font-medium text-shade-primary transition-all hover:bg-el [&[data-state=open]>svg:first-child]:rotate-90">
        <div className="flex items-center gap-2">
          <InlineEditor
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            maxRows={1}
            value={folderTitle}
            onChange={(e) => {
              rename({
                id: folderId,
                title: e.target.value,
              });
            }}
            className="w-full overflow-hidden text-sm bg-transparent appearance-none resize-none text-ellipsis text-shade-primary focus:outline-none"
          />
          {!!total && !isEditing && (
            <div className="bg-el px-1.5  rounded-[20px] text-[10px] leading-0">
              {total}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <FilePlus
            strokeWidth={1.35}
            onClick={(e) => {
              e.preventDefault();
              addNew({
                parentId: folderId,
                title: "Untitled File",
                depth,
                type: "FILE",
              });
            }}
            className="hidden w-5 h-5 cursor-pointer text-shade-secondary shrink-0 group-hover:block"
          />
          <FolderPlus
            strokeWidth={1.35}
            onClick={(e) => {
              e.preventDefault();
              addNew({
                parentId: folderId,
                title: "Untitled Folder",
                depth,
                type: "FOLDER",
              });
            }}
            className="hidden w-5 h-5 cursor-pointer shrink-0 hover:text-shade-primary group-hover:block"
          />
        </div>
      </div>
    </NotesContextMenu>
  );
};
