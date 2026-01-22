import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { LAYOUT_MODES, STORAGE_KEYS } from "@/lib/constants";
import type { MemberDetail, NavMenu } from "@/lib/models/types";

const initialMemberDetails: MemberDetail = {
  id: '',
  name: '',
  family_name: '',
  display_name: '',
  is_admin: false,
  availableRoles: ['anonymous'],
  authTokenAvailable: false,
  givenName: '',
  profilePic: '',
  mail: '',
  initials: '',
  sAMAccountName: '',
};


const getInitialLayout = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.LAYOUT);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if ((Object.values(LAYOUT_MODES) as string[]).includes(parsed)) {
          return parsed;
        }
      } catch {
        if ((Object.values(LAYOUT_MODES) as string[]).includes(stored)) {
          return stored;
        }
      }
    }
  }
  return LAYOUT_MODES.SIDEBAR_OPEN;
};

export const appLayout = atomWithStorage<string>(
  STORAGE_KEYS.LAYOUT,
  getInitialLayout()
);
export const isShellApp = atom<boolean>(false);
export const memberDetails = atom<MemberDetail>(initialMemberDetails);
export const menuItems = atom<NavMenu[]>([]);
