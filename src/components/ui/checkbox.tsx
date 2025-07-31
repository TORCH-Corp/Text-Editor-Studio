import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-border-system-global-secondary bg-background-system-body-primary data-[state=checked]:bg-background-presentation-action-primary data-[state=checked]:text-content-presentation-action-light-primary data-[state=checked]:border-border-presentation-action-primary focus-visible:border-border-presentation-state-focus focus-visible:ring-border-presentation-state-focus/50 aria-invalid:ring-border-presentation-state-negative/20 aria-invalid:border-border-presentation-state-negative size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
