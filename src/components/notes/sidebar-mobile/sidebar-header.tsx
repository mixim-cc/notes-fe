import { Calendar, FolderIcon, Star } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/utils/cn";

interface SidebarHeaderProps {
  tab: "default" | "journal";
  onTabChange: (newTab: "default" | "journal") => void;
}

export const SidebarHeader = ({ onTabChange, tab }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b shrink-0 border-stroke-base">
      <h1 className="text-xl font-semibold leading-none text-shade-primary">
        {tab === "default" ? "Mixim Notes" : "Journal"}
      </h1>
      <div className="flex items-center gap-2">
        <IconButton
          variant="ghost"
          size={"lg"}
          onClick={() => onTabChange("default")}
          className={cn({ "bg-back-hover": tab === "default" })}
        >
          <FolderIcon className="w-6 h-6 text-shade-seondary" />
        </IconButton>
        <IconButton
          variant="ghost"
          size={"lg"}
          onClick={() => onTabChange("journal")}
          className={cn({ "bg-back-hover": tab === "journal" })}
        >
          <Calendar className="w-6 h-6 text-shade-seondary" />
        </IconButton>
        <IconButton size={"lg"} variant="ghost">
          <Star className="w-6 h-6 text-shade-seondary" />
        </IconButton>
      </div>
    </div>
  );
};
