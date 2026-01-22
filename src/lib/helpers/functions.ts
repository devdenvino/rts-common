import type { AppConfig, IAppNavContext, NavMenu } from "@/lib/models/types";

export function getAppConfig(key: string = ""): AppConfig | undefined {
  const config = window._env;
  return config?.apps?.[key] || config;
}

// function to get only initials from full name
export function getInitials(name: string) {
  if (!name) {
    return "";
  }
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < parts.length; i++) {
    initials += parts[i].length > 1 ? parts[i][0].toUpperCase() : "";
    if (initials.length > 2) {
      break;
    }
  }
  return initials;
}

export const toTitleCase = (str: string) => {
  return (
    str
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || ""
  );
};

export const prefixHrefs = ({
  menuItems,
  basePath = "",
}: IAppNavContext): NavMenu[] => {
  const updatedNavItems = menuItems.map((item) => ({
    ...item,
    href: item.href ? `${basePath}${item.href}` : item.href,
    pageLinks: item.pageLinks?.map((pageLink) => ({
      ...pageLink,
      href: pageLink.href ? `${basePath}${pageLink.href}` : pageLink.href,
    })),
  }));
  return updatedNavItems;
};
