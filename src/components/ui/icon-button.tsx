import * as React from "react";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-base text-shade-primary hover:bg-base/90",
        outline:
          "border border-stroke-base hover:bg-base hover:text-shade-primary",
        ghost: "hover:bg-base-hover hover:text-shade-primary",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
        xs: "h-5 w-5 rounded-[3px]",
        lg: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, buttonVariants };
