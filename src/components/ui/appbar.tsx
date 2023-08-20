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
import Link from "next/link";

type OasisMenu = "none" | "menu" | "add" | "search" | "avatar";

export const Appbar = () => {
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

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <motion.div
        layout
        className="flex flex-col justify-between gap-4 px-3 py-2 border-t -shadow-3xl bg-base dark:border dark:border-stroke-base"
      >
        {searchTerm && currentMenu === "search" && (
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className="absolute z-20 flex flex-col gap-2 cursor-pointer bottom-16 "
          >
            {searchItems?.map((searchItem) => (
              <div
                key={searchItem?.id}
                className="flex gap-2 p-2 rounded-md shadow-lg bg-base hover:bg-base-hover "
                onClick={() => {
                  selectFile({ id: String(searchItem?.id) });
                  setCurrentMenu("menu");
                  setSearchTerm("");
                }}
              >
                <FileText className="w-4 h-4" />
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
            className="absolute left-0 right-0 z-20 flex flex-col gap-4 p-4 pb-6 m-auto shadow-lg cursor-pointer bg-base bottom-16"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-shade-secondary">
                My Profile
              </p>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-back">
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
                className="text-red-500 border border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-600 dark:border-back dark:bg-red-700 dark:text-red-200"
                variant="outline"
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Log Out
              </Button>
            </SignOutButton>
          </motion.div>
        )}

        <motion.div
          layout
          className={"flex h-10 items-center justify-between w-full gap-4 p-1"}
        >
          <motion.div
            layout
            className={cn("flex  items-center  gap-4", {
              "gap-10 w-full": currentMenu === "none",
            })}
          >
            <motion.div
              layout
              className="relative flex items-center cursor-pointer group"
            >
              <div className="flex items-center">
                <img
                  src="/images/logo-dark.svg"
                  alt="logo"
                  className="hidden object-contain w-10 h-10 dark:block"
                  onClick={() => setCurrentMenu("menu")}
                />
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="object-contain w-10 h-10 dark:hidden"
                  onClick={() => setCurrentMenu("menu")}
                />
              </div>
            </motion.div>
          </motion.div>

          {currentMenu === "menu" && (
            <motion.div
              layout
              className="flex items-center justify-center gap-2"
            >
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("add")}
              >
                <Plus className="w-5 h-5" />
              </IconButton>
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("search")}
              >
                <Search className="w-5 h-5" />
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
                leftIcon={<Plus className="w-4 h-4" />}
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
                leftIcon={<Plus className="w-4 h-4" />}
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
            <motion.div className="w-auto">
              <Input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
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
                  prev === "avatar" ? "menu" : "avatar"
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
