"use client";

import { NoteEditor } from "@/components/notes/editor";
import { NoteEditorMobile } from "@/components/notes/editor-mobile";
import { NoteSidebar } from "@/components/notes/sidebar";
import WhatsNewModal from "@/components/others/whats-new-dialog";
import { Oasis } from "@/components/ui/oasis";
import { setNetworkStatus } from "@/services/state/functions/file-system/set-network-status";
import { useInitalLoad } from "@/services/state/functions/file-system/useInitialLoad";
import { useSync } from "@/services/state/functions/file-system/useSync";
import useIsMobile from "@/utils/useMobile";
import { hasSeenWhatsNewModal } from "@/utils/userPreferences";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Page() {
  const isMobile = useIsMobile();
  const { isLocalLoaded } = useInitalLoad();
  useSync();

  const { setTheme, theme } = useTheme();

  useHotkeys("alt + t", () => setTheme(theme === "light" ? "dark" : "light"), {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useEffect(() => {
    const onlineHandler = () => {
      setNetworkStatus({ status: "online" });
    };

    const offlineHandler = () => {
      setNetworkStatus({ status: "offline" });
    };

    if (typeof window !== undefined) {
      window.addEventListener("online", onlineHandler);
      window.addEventListener("offline", offlineHandler);
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("online", onlineHandler);
        window.removeEventListener("offline", offlineHandler);
      }
    };
  }, []);

  if (!isLocalLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-gray-800 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {!hasSeenWhatsNewModal() && <WhatsNewModal />}
      {isMobile ? (
        <Mobile />
      ) : (
        <>
          <motion.div
            layout
            className="flex h-screen bg-base-hover md:gap-4 md:p-4"
          >
            <NoteSidebar />
            <NoteEditor />
          </motion.div>
          <Oasis />
        </>
      )}
      {/* <motion.div
        layout
        className="hidden h-screen bg-base-hover md:flex md:gap-4 md:p-4"
      >
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis /> */}
    </>
  );
}

function Mobile() {
  return (
    <div>
      <div>
        <NoteEditorMobile />
      </div>
    </div>
  );
}
