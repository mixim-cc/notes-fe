import { Calendar, FolderIcon, Star } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/utils/cn";

interface SidebarHeaderProps {
  tab: "default" | "journal";
  onTabChange: (newTab: "default" | "journal") => void;
}

export const SidebarHeader = ({ onTabChange, tab }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between h-12 px-4 shrink-0 ">
      <h1 className="text-lg font-medium leading-none text-shade-primary">
        {tab === "default" ? "Mixim Notes" : "Journal"}
      </h1>
      {/* <div className="flex items-center gap-2">
        <IconButton
          variant="ghost"
          onClick={() => onTabChange("default")}
          className={cn({ "bg-back-hover": tab === "default" })}
        >
          <FolderIcon className="w-5 h-5 text-shade-seondary" />
        </IconButton>
        <IconButton
          variant="ghost"
          onClick={() => onTabChange("journal")}
          className={cn({ "bg-back-hover": tab === "journal" })}
        >
          <Calendar className="w-5 h-5 text-shade-seondary" />
        </IconButton>
        <IconButton variant="ghost">
          <Star className="w-5 h-5 text-shade-seondary" />
        </IconButton>
      </div> */}
    </div>
  );
};
