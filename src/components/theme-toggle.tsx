"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import { IconButton } from "./ui/icon-button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <IconButton variant="ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Icons.sun className="rotate-0 h-5 w-5 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  )
}
