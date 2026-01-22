import { useTheme, type ThemeColor } from "@/components/shared/theme/provider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/custom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toTitleCase } from "@/lib/helpers/functions";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

export function ThemeColorToggle() {
  const { setThemeColor, themeColor } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="space-y-1.5">
          <Label className="text-xs">Select Theme</Label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                "blue",
                "green",
                "amber",
                // 'rose',
                "purple",
                "orange",
                "teal",
                // 'mono',
                // 'scaled',
                "red",
                "yellow",
                "violet",
              ] as ThemeColor[]
            ).map((colorName) => {
              const isActive = themeColor === colorName;
              return (
                <div className={`theme-${colorName}`} key={colorName}>
                  <Button
                    variant={"outline"}
                    key={colorName}
                    onClick={() => {
                      setThemeColor(colorName);
                    }}
                    className={cn(
                      "justify-start",
                      "w-full",
                      isActive && "border-2 border-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-primary"
                      )}
                    >
                      {isActive && (
                        <Icons.checkIcon className="h-4 w-4 text-white" />
                      )}
                    </span>
                    {toTitleCase(colorName)}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
