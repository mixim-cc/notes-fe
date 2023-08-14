import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import { NotesContextMenu, NotesTripleDotsMenu } from "../context-menu";
import { cn } from "@/utils/cn";
import { FileText } from "lucide-react";
import InlineEditor from "../../inline-editor";
import Link from "next/link";

interface SidebarFileProps {
  isSelected?: boolean;
  title?: string;
  id: string;
  onTitleChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onTitleBlur?: () => void;
  onTitleKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  onFileClick?: () => void;

  onStar?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;

  hasParent?: boolean;
}

export const SidebarFile = ({
  isSelected,
  title,
  id,
  onTitleBlur,
  onTitleChange,
  onTitleKeyDown,
  onFileClick,
  onCopy,
  onDelete,
  onStar,
  hasParent,
}: SidebarFileProps) => {
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
      type: "COPY",
      handler: onCopy,
    },
    {
      type: "STAR",
      handler: onStar,
    },
    {
      type: "DELETE",
      handler: onDelete,
    },
  ];

  return (
    <Link href={`?id=${id}`} shallow>
      <NotesContextMenu id="1" options={menuOptions}>
        <div
          tabIndex={0}
          onClick={onFileClick}
          className={cn(
            "min-h-7 text-primary group flex flex-1 cursor-pointer items-center justify-between gap-2 rounded-md  px-1 text-sm font-medium transition-all hover:bg-el",
            {
              "bg-el": isSelected,
            }
          )}
        >
          <div className="flex w-[240px] items-center gap-2">
            {hasParent ? (
              <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>
            ) : (
              <FileText className="text-shade-seondary h-5 w-5" />
            )}
            <InlineEditor
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              autoFocus
              placeholder="Untiled File"
              value={title}
              className="h-full w-full resize-none  appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
              onChange={onTitleChange}
              onBlur={onTitleBlur}
              onKeyDown={onTitleKeyDown}
              ref={ref}
            />
          </div>

          <NotesTripleDotsMenu id="1" options={menuOptions} />
        </div>
      </NotesContextMenu>
    </Link>
  );
};
