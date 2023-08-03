/* eslint-disable @next/next/no-img-element */
"use client";

import { get } from "http";
import { useEffect, useState } from "react";
// import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
// import {
//   addNewFile,
//   addNewFolder,
//   clear,
//   setSelectedFile,
//   setSelectedFileWithSyncedId,
//   triggerSync,
// } from "@/services/redux/reducers/file-explorer-reducer"
import { cn } from "@/utils/cn";
import { SignOutButton, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LogOut,
  Plus,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { clear } from "@/services/state/functions/file-system/clear";
import { useSelector } from "@legendapp/state/react";
import { state } from "@/services/state";
import { selectFile } from "@/services/state/functions/file-system/select-file";
import { addNew } from "@/services/state/functions/file-system/add-new";

type OasisMenu = "none" | "menu" | "add" | "search" | "avatar";

export const Oasis = () => {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentMenu, setCurrentMenu] = useState<OasisMenu>("menu");
  const [currentTime, setCurrentTime] = useState(dayjs());

  const fileSystem = useSelector(state.fs.fileSystem);

  const searchItems = fileSystem.filter((obj) => {
    if (obj?.type === "FILE") {
      const blocks = obj?.content?.blocks;
      if (blocks) {
        for (const block of blocks) {
          if (block?.data?.text?.includes(searchTerm)) {
            return true; // If any block contains the search word, include the object in the result
          }
        }
      }
    }

    return (
      obj?.type === "FILE" &&
      obj.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  useHotkeys(
    ["alt + 0", "g + f"],
    () => setCurrentMenu("none"),
    [currentMenu],
    {
      enabled: true,
      enableOnContentEditable: true,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );
  useHotkeys("alt + 1", () => setCurrentMenu("add"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + s", () => setCurrentMenu("search"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + t", () => setCurrentMenu("menu"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + p", () => setCurrentMenu("avatar"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });

  if (!user) {
    return null;
  }

  return (
    <div className="absolute bottom-[52px] left-[50%] z-20 translate-x-[-50%]">
      <motion.div
        layout
        className="z-20 flex w-auto max-w-[670px] flex-col gap-4 rounded-2xl bg-base p-3 shadow-2xl dark:border dark:border-stroke-base"
      >
        {searchTerm && currentMenu === "search" && (
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className="flex cursor-pointer flex-col gap-2"
          >
            {searchItems?.map((searchItem) => (
              <div
                key={searchItem?.id}
                className="flex gap-2 rounded-md p-2 hover:bg-base-hover "
                onClick={() => {
                  selectFile({ id: String(searchItem?.id) });
                  setCurrentMenu("menu");
                  setSearchTerm("");
                }}
              >
                <FileText className="h-4 w-4" />
                <div className="">
                  <p className="text-xs text-shade-primary">
                    {searchItem?.title}
                  </p>
                  <p className="text-sm text-shade-primary">
                    {searchItem?.content?.blocks
                      ?.filter((f) =>
                        f?.data?.text?.toLowerCase().includes(searchTerm)
                      )
                      .map((a, index) => (
                        <p key={index}>{a.data.text}</p>
                      ))}
                  </p>
                </div>
              </div>
            ))}

            <div
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-base-hover"
              onClick={() => {
                const id = addNew({
                  parentId: "",
                  title: searchTerm,
                  type: "FILE",
                  depth: 0,
                });
                selectFile(id);

                setCurrentMenu("menu");
                setSearchTerm("");
              }}
            >
              <IconButton size="xs" variant="outline">
                <Plus className="h-3 w-3 text-shade-secondary" />
              </IconButton>
              <p className="text-sm text-shade-primary">
                Create new Note with title &quot;{searchTerm}&quot;
              </p>
            </div>
          </motion.div>
        )}

        {currentMenu === "avatar" && (
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className="flex cursor-pointer flex-col gap-4 pb-6"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-shade-secondary">
                My Profile
              </p>

              <div className="flex items-center gap-2 rounded-lg bg-back p-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.imageUrl} />
                </Avatar>
                <div className="flex flex-col ">
                  <p className="font-medium text-shade-secondary">
                    {user.fullName}
                  </p>
                  <p className="text-sm font-medium text-shade-subtle">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </div>
            <SignOutButton signOutCallback={() => clear()}>
              <Button
                className="border border-red-300 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 dark:border-back dark:bg-red-700 dark:text-red-200"
                variant="outline"
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                Log Out
              </Button>
            </SignOutButton>
          </motion.div>
        )}

        <motion.div
          layout
          className={"flex h-10 items-center justify-center gap-10 p-1"}
        >
          <motion.div
            layout
            className={cn("flex shrink-0 items-center justify-center gap-4", {
              "gap-10": currentMenu === "none",
            })}
          >
            <motion.div
              layout
              className="group relative flex cursor-pointer items-center"
              onClick={() => {
                setCurrentMenu((prev) => {
                  if (prev === "menu") {
                    return "none";
                  }
                  return "menu";
                });
              }}
            >
              {currentMenu === "none" ? (
                <div className="flex items-center">
                  <ChevronLeft className="absolute -left-4 hidden h-4 w-4 animate-pulse text-shade-secondary group-hover:block" />
                  <motion.div animate={{ rotate: [0, 90] }}>
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden h-10 w-10 object-contain dark:block"
                    />
                    <img
                      src="/images/logo.svg"
                      alt="logo"
                      className="h-10 w-10 object-contain dark:hidden"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [90, 0] }}
                    className="flex items-center"
                  >
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden h-10 w-10 object-contain dark:block"
                    />
                    <img
                      src="/images/logo.svg"
                      alt="logo"
                      className="h-10 w-10 object-contain dark:hidden"
                    />
                  </motion.div>
                  <ChevronRight className="absolute -right-4 hidden h-4 w-4 animate-pulse text-shade-secondary group-hover:block" />
                </div>
              )}
            </motion.div>
            {currentMenu === "none" && (
              <motion.div layout className="flex flex-col">
                <div className="text-xs font-normal text-shade-secondary">
                  {getGreeting(currentTime.toDate())}, {user.firstName}
                </div>
                <div className="text-lg font-medium text-shade-primary">
                  It&apos;s {currentTime.format("hh:mm A")}
                </div>
              </motion.div>
            )}
          </motion.div>

          {(currentMenu === "menu" || currentMenu === "avatar") && (
            <motion.div
              layout
              className="flex items-center justify-center gap-2"
            >
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("add")}
              >
                <Plus className="h-5 w-5" />
              </IconButton>
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("search")}
              >
                <Search className="h-5 w-5" />
              </IconButton>

              <ThemeToggle />
            </motion.div>
          )}

          {currentMenu === "add" && (
            <motion.div
              animate={{
                scale: [1, 1, 1, 1, 1],
              }}
              transition={{
                layout: { duration: 0.3 },
              }}
              className="flex items-center justify-center gap-4"
            >
              <Button
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  addNew({
                    title: "Untitled Note",
                    parentId: "",
                    type: "FILE",
                    depth: 0,
                  });
                }}
              >
                New Note
              </Button>
              <Button
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  addNew({
                    title: "Untitled Folder",
                    parentId: "",
                    type: "FOLDER",
                    depth: 0,
                  });
                }}
              >
                New Folder
              </Button>
            </motion.div>
          )}

          {currentMenu === "search" && (
            <motion.div className="w-[1000px]">
              <Input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                type="search"
                placeholder="What are you searching for? Try writing it"
              />
            </motion.div>
          )}

          <motion.div layout>
            <Avatar
              className="cursor-pointer"
              onClick={() =>
                setCurrentMenu((prev) =>
                  prev === "avatar" ? "none" : "avatar"
                )
              }
            >
              <AvatarImage src={user.imageUrl} />
            </Avatar>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const getGreeting = (currentTime: Date) => {
  if (currentTime.getHours() < 12) {
    return "Good Morning";
  } else if (currentTime.getHours() < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
