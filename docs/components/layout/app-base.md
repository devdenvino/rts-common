# AppBase Component

Main application wrapper component.

## Usage

```typescript
import { AppBase } from '@devdenvino/rts-common';

<AppBase
  mfeId="my-app"
  oidcConfig={{
    authority: 'https://auth.example.com',
    client_id: 'my-client-id',
    redirect_uri: window.location.origin,
  }}
>
  <YourApp />
</AppBase>
```

## Props

```typescript
interface AppBaseProps {
  mfeId: string;
  oidcConfig: OIDCConfig;
  sidebarProps?: SidebarProps;
  topNavProps?: TopNavProps;
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'system';
}
```

## See Also

- [Configuration Guide](/guide/configuration)
- [Layout System](/guide/layouts)
