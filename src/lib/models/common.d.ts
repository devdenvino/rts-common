import type { Icon, IconProps } from "@tabler/icons-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, JSX, ReactNode, RefAttributes } from "react";
import type { AppDetail } from "./types";

export type SearchProps = {
  search?: (search: string) => Promise<SearchResult[]>;
};

export type SearchResult = {
  title: string;
  href: string;
  icon?: ReactNode;
  element?: ReactNode;
};
