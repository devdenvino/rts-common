import * as React from "react"
import { PaletteIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { setColorScheme, useAppStore } from "@/store/app-store"
import type { ColorScheme } from "@/store/app-store"

// ─── Color list — matches shadcn/create ───────────────────────────────────────

const COLOR_SCHEMES: { value: ColorScheme; label: string; swatch: string }[] = [
  { value: "neutral",  label: "Neutral",  swatch: "oklch(0.439 0 0)" },
  { value: "amber",    label: "Amber",    swatch: "var(--color-amber-500)" },
  { value: "blue",     label: "Blue",     swatch: "var(--color-blue-500)" },
  { value: "cyan",     label: "Cyan",     swatch: "var(--color-cyan-500)" },
  { value: "emerald",  label: "Emerald",  swatch: "var(--color-emerald-500)" },
  { value: "fuchsia",  label: "Fuchsia",  swatch: "var(--color-fuchsia-500)" },
  { value: "green",    label: "Green",    swatch: "var(--color-green-500)" },
  { value: "indigo",   label: "Indigo",   swatch: "var(--color-indigo-500)" },
  { value: "lime",     label: "Lime",     swatch: "var(--color-lime-500)" },
  { value: "orange",   label: "Orange",   swatch: "var(--color-orange-500)" },
  { value: "pink",     label: "Pink",     swatch: "var(--color-pink-500)" },
  { value: "purple",   label: "Purple",   swatch: "var(--color-purple-500)" },
  { value: "red",      label: "Red",      swatch: "var(--color-red-500)" },
  { value: "rose",     label: "Rose",     swatch: "var(--color-rose-500)" },
  { value: "sky",      label: "Sky",      swatch: "var(--color-sky-500)" },
  { value: "teal",     label: "Teal",     swatch: "var(--color-teal-500)" },
  { value: "violet",   label: "Violet",   swatch: "var(--color-violet-500)" },
  { value: "yellow",   label: "Yellow",   swatch: "var(--color-yellow-400)" },
]

// ─── Component ────────────────────────────────────────────────────────────────

type ColorSchemePickerProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  align?: React.ComponentProps<typeof PopoverContent>["align"]
  side?: React.ComponentProps<typeof PopoverContent>["side"]
}

function ColorSchemePicker({
  variant = "ghost",
  size = "icon",
  align = "end",
  side,
  className,
  ...props
}: ColorSchemePickerProps) {
  const colorScheme = useAppStore((s) => s.colorScheme)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-slot="color-scheme-picker"
          variant={variant}
          size={size}
          className={className}
          title={`Color scheme: ${colorScheme}`}
          {...props}
        >
          <PaletteIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        className="w-auto p-3"
      >
        <TooltipProvider delayDuration={300}>
          <div className="grid grid-cols-6 gap-1.5">
            {COLOR_SCHEMES.map(({ value, label, swatch }) => {
              const isActive = colorScheme === value
              return (
                <Tooltip key={value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setColorScheme(value)}
                      className="size-7 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                      style={{
                        backgroundColor: swatch,
                        borderColor: isActive ? "white" : "transparent",
                        boxShadow: isActive ? `0 0 0 2px ${swatch}` : undefined,
                      }}
                      aria-label={label}
                      aria-pressed={isActive}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>
      </PopoverContent>
    </Popover>
  )
}

export { ColorSchemePicker, type ColorSchemePickerProps }
