import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border-system-global-secondary placeholder:text-content-system-global-secondary focus-visible:border-border-presentation-state-focus focus-visible:ring-border-presentation-state-focus/50 aria-invalid:ring-border-presentation-state-negative/20 aria-invalid:border-border-presentation-state-negative bg-background-system-body-primary flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
