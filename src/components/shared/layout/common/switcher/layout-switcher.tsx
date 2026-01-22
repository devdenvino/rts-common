import { ViewHorizontalIcon, ViewVerticalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAtom } from "jotai";
import { appLayout } from "@/lib/contexts/atoms";
import { LAYOUT_MODES } from "@/lib/constants";

export function LayoutSwitcher() {
  const [, setAppLayout] = useAtom(appLayout);
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
        <DropdownMenuItem
          onClick={() => {
            setAppLayout(LAYOUT_MODES.SIDEBAR_OPEN);
          }}
        >
          Modern
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setAppLayout(LAYOUT_MODES.DEFAULT);
          }}
        >
          Classic
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
