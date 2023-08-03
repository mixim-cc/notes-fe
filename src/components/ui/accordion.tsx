"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, Loader2 } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isLoading?: boolean;
  }
>(({ className, children, isLoading, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      asChild
      ref={ref}
      className={cn(
        "group flex h-7 flex-1 items-center gap-2 rounded-md px-1 py-4 text-sm font-medium text-shade-primary transition-all hover:bg-el [&[data-state=open]>svg:first-child]:rotate-90",
        className
      )}
      {...props}
    >
      <div>
        {isLoading ? <div className="hidden" /> : null}
        {isLoading ? (
          <Loader2 className="h-4 w-5 shrink-0 text-shade-secondary animate-spin" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-shade-secondary transition-transform duration-200" />
        )}
        {children}
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-xs transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
