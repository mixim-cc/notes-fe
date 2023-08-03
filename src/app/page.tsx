"use client";

import { NoteEditor } from "@/components/notes/editor";
import { NoteSidebar } from "@/components/notes/sidebar";
import WhatsNewModal from "@/components/others/whats-new-dialog";
import { Oasis } from "@/components/ui/oasis";
import { setNetworkStatus } from "@/services/state/functions/file-system/set-network-status";
import { useInitalLoad } from "@/services/state/functions/file-system/useInitialLoad";
import { useSync } from "@/services/state/functions/file-system/useSync";
import { hasSeenWhatsNewModal } from "@/utils/userPreferences";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Page() {
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center gap-8 px-8 py-32 text-2xl font-semibold md:hidden">
          <Image
            src="/images/error.png"
            height={200}
            width={200}
            alt="Reponsive Error"
          />
          <p className="">
            Unfortunately Mixim Drafts is not Mobile Responsive.
          </p>
          <p className="">
            We recommend using Big Screens(Tablet, Laptop or Desktop) for Better
            Experience.
          </p>
        </div>
        <div></div>
      </div>

      {!hasSeenWhatsNewModal() && <WhatsNewModal />}

      <motion.div
        layout
        className="hidden h-screen bg-base-hover md:flex md:gap-4 md:p-4"
      >
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </>
  );
}
