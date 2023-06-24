import * as React from "react"
import { cn } from "@/utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && <div className="absolute left-2 top-[50%] translate-y-[-50%]">{leftIcon}</div>}

        <input
          type={type}
          className={cn(
            "placeholder:text-subtle focus-visible:ring-ring flex h-10 w-full items-center justify-center gap-2 rounded-md border border-stroke-base bg-base p-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:ring-stroke-base-strong focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            { "pl-9": !!leftIcon },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"
