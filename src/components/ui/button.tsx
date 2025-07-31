import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-presentation-state-focus focus-visible:ring-border-presentation-state-focus/50 focus-visible:ring-[3px] aria-invalid:ring-border-presentation-state-negative/20 aria-invalid:border-border-presentation-state-negative",
  {
    variants: {
      variant: {
        default:
          "bg-background-presentation-action-primary text-content-presentation-action-light-primary shadow-xs hover:bg-background-presentation-action-primary/90",
        destructive:
          "bg-background-presentation-state-negative-primary text-content-presentation-action-light-primary shadow-xs hover:bg-background-presentation-state-negative-primary/90 focus-visible:ring-border-presentation-state-negative",
        outline:
          "border border-border-system-global-secondary bg-background-system-body-primary shadow-xs hover:bg-background-presentation-action-hover hover:text-content-system-global-primary",
        secondary:
          "bg-background-presentation-action-secondary text-content-system-global-primary shadow-xs hover:bg-background-presentation-action-hover",
        ghost:
          "hover:bg-background-presentation-action-hover hover:text-content-system-global-primary",
        link: "text-content-presentation-action-link-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
