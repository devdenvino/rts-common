import * as React from "react";
import type { IAppNavContext } from "../models/types";

interface AppNavContextType {
  navItems: IAppNavContext;
  endNavItems: IAppNavContext;
  setNavItems: (appNavData: IAppNavContext) => void;
  setEndNavItems: (appNavData: IAppNavContext) => void;
}

const AppNavContext = React.createContext<AppNavContextType | null>(null);

export function AppNavProvider({ children }: { children: React.ReactNode }) {
  const [navItems, setNavItems] = React.useState<IAppNavContext>({
    menuItems: [],
  });
  const [endNavItems, setEndNavItems] = React.useState<IAppNavContext>({
    menuItems: [],
  });

  return (
    <AppNavContext.Provider
      value={{ navItems, endNavItems, setNavItems, setEndNavItems }}
    >
      {children}
    </AppNavContext.Provider>
  );
}

export function useAppNav() {
  const context = React.useContext(AppNavContext);
  if (!context) {
    throw new Error("useAppNav must be used within AppNavProvider");
  }
  return context;
}
