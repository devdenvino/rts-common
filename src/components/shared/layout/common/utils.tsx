import type { useResourceAccess } from "@/lib/contexts/roles";
import { getInitials } from "@/lib/helpers/functions";
import type { AppDetail, NavMenu } from "@/lib/models/types";
import { GalleryVerticalEndIcon } from "lucide-react";

export function getAppImage(activeApp: AppDetail) {
  return activeApp.image ? (
    <img
      src={activeApp.image}
      alt={activeApp.title ? getInitials(activeApp.title) : "App avatar"}
      className="object-cover size-4 rounded-tl-[1.5rem] rounded-tr-md rounded-bl-md rounded-br-md group-hover:scale-95"
    />
  ) : (
    <GalleryVerticalEndIcon className="size-4" />
  );
}

const checkRequiredAuthRole = (
  requiredAuthRole: string | undefined,
  resourceAccess: ReturnType<typeof useResourceAccess>
) => {
  if (requiredAuthRole && resourceAccess) {
    const requiredAuthRoleParts = requiredAuthRole.split(":"); // e.g., "app-hub:hub-admin"
    if (
      requiredAuthRoleParts.length === 2 &&
      requiredAuthRoleParts[0] &&
      requiredAuthRoleParts[1] &&
      resourceAccess?.[requiredAuthRoleParts[0]]
    ) {
      const [appName, roleName] = requiredAuthRoleParts;
      return (resourceAccess[appName]?.roles || []).includes(roleName);
    } else {
      // Malformed requiredAuthRole or resourceAccess not available, deny access
      return false;
    }
  }
  return true;
};

export const getNavLinks = (
  navMenuItems: NavMenu[],
  availableRoles: string[] | undefined,
  resourceAccess: ReturnType<typeof useResourceAccess>
) => {
  let usrItems = (navMenuItems || []).map((item: NavMenu) => {
    return {
      ...item,
      pageLinks: item.pageLinks?.filter((link) => {
        if (link.disabled) {
          return false;
        }
        if (!checkRequiredAuthRole(link.requiredAuthRole, resourceAccess)) {
          return false;
        }
        if (link.requiredAppRole) {
          return (availableRoles || []).includes(link.requiredAppRole);
        }
        return true;
      }),
    };
  });
  return usrItems.filter((item) => {
    if (item.disabled || item.pageLinks?.length === 0) {
      return false;
    }
    if (!checkRequiredAuthRole(item.requiredAuthRole, resourceAccess)) {
      return false;
    }
    if (item.requiredAppRole) {
      return (availableRoles || []).includes(item.requiredAppRole);
    }
    return true;
  });
};
