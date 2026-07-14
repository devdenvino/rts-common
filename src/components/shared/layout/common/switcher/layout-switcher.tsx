import { ViewHorizontalIcon, ViewVerticalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLayoutMode, LAYOUT_MODES } from "@/store/app-store";

export function LayoutSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ViewHorizontalIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <ViewVerticalIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle Layout</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLayoutMode(LAYOUT_MODES.SIDEBAR)}>
          Modern
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLayoutMode(LAYOUT_MODES.TOPNAV)}>
          Classic
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
