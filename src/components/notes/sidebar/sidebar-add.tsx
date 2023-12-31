import { FilePlus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addNew } from "@/services/state/functions/file-system/add-new";
import { toast } from "sonner";

export const SidebarAdd = () => {
  return (
    <div className="flex items-center justify-between gap-2 pb-4 border-b border-stroke-base">
      <Button
        className="flex justify-start w-full"
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Note",
            type: "FILE",
          });
          toast.success("New note created!");
        }}
      >
        <FilePlus size={18} className=" text-shade-secondary" />
        Note
      </Button>
      <Button
        className="justify-start w-full"
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Folder",
            type: "FOLDER",
          });
          toast.success("New folder created!");
        }}
      >
        <FolderPlus size={18} className="w-5 h-5 text-shade-secondary" />
        Folder
      </Button>
    </div>
  );
};
