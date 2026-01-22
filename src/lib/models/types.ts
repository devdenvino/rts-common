import type { Icon } from '@tabler/icons-react';
import type { LucideIcon } from 'lucide-react';

export type UserRole = 'admin' | 'user' | 'anonymous';

export type PageLink = {
  title: string;
  href?: string;
  description?: string;
  requiredAppRole?: UserRole;
  requiredAuthRole?: string;
  disabled?: boolean;
  resolvedPath?: string;
  isActive?: boolean;
  icon?: Icon | LucideIcon;
};

export type AppDetail = PageLink & {
  logo: React.ElementType;
  image?: string;
};

export type NavMenu = PageLink & {
  pageLinks?: PageLink[];
};

export type AppConfig = {
  title: string;
  apiBase: string;
  oidcConfig: {
    authority: string;
    clientId: string;
    kcIdpHint: string;
    /**
     * Enable this to allow authentication over HTTP (non-HTTPS).
     * This applies a crypto.subtle polyfill for PKCE support.
     * WARNING: Only use this in development environments!
     */
    allowInsecureContext?: boolean;
  };
  statusPage?: string;
  profilePage?: string;
  poweredBy?: string;
  apps?: {
    [appName: string]: AppConfig;
  };
  novu?: {
    applicationIdentifier: string;
    backendUrl: string;
    socketUrl: string;
  };
  otel?: {
    serviceName: string;
    collectorUrl: string;
    debug?: boolean;
  };
};

export type Entity = {
  id: string;
  name: string;
};

export type IdName = Entity & {
  givenName: string | null;
  family_name: string | null;
  display_name: string | null;
};

export type AuthDetail = {
  id: string;
  name: string;
};

export type MemberDetail = AuthDetail &
  IdName & {
    company?: string;
    country?: string;
    department?: string;
    homePhone?: string;
    is_admin?: boolean;
    location?: string;
    mail: string;
    mobile?: string;
    sAMAccountName: string;
    title?: string;
    initials?: string;
    profilePic?: string;
    availableRoles?: string[];
    authTokenAvailable?: boolean;
  };

// Augment the Window interface
declare global {
  interface Window {
    _env: AppConfig;
  }
}

export type IAppNavContext = {
  menuItems: NavMenu[];
  basePath?: string;
};
