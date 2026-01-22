// Development configuration example
// This file is for local development testing only and should not be used in production
// In production, these values should come from environment variables or configuration management
window._env = {
  appTitle: 'RTS Common',
  apiBase: '/v1',
  oidcConfig: {
    authority: 'https://your-auth-server.com/realms/your-realm',
    clientId: 'your-client-id',
    kcIdpHint: 'your-idp-hint',
    allowInsecureContext: false, // Set to true only for development with HTTP
  },
  novu: {
    backendUrl: 'https://your-backend-url.com',
    socketUrl: 'https://your-socket-url.com',
    applicationIdentifier: 'your-application-identifier',
  },
};
