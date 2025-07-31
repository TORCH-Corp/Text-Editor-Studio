import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-content-system-global-primary placeholder:text-content-system-global-secondary selection:bg-background-presentation-action-selected selection:text-content-system-global-primary bg-background-system-body-primary border-border-system-global-secondary text-content-system-global-primary flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-border-presentation-state-focus focus-visible:ring-border-presentation-state-focus/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-border-presentation-state-negative/20 aria-invalid:border-border-presentation-state-negative",
        className
      )}
      {...props}
    />
  )
}

export { Input }
