# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **Do NOT** open a public issue
2. Send a description of the vulnerability to the maintainers via:
   - GitHub Security Advisories (preferred): https://github.com/devdenvino/rts-common/security/advisories/new
   - Or email the maintainers directly

3. Include the following information:
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability
   - How you think the vulnerability might be exploited

4. You should receive a response within 48 hours
5. We will investigate and keep you updated on the progress

## Security Best Practices

When using this package:

1. **Keep dependencies updated**: Regularly update to the latest version
2. **Review security advisories**: Check GitHub security advisories regularly
3. **Use HTTPS**: Always use HTTPS for authentication servers
4. **Secure tokens**: Never commit tokens or secrets to version control
5. **Environment variables**: Use environment variables for sensitive configuration
6. **Validate inputs**: Always validate and sanitize user inputs
7. **CSP headers**: Implement Content Security Policy headers in production

## Known Security Considerations

### Crypto Polyfill

The package includes a crypto polyfill for development environments without HTTPS. This polyfill:

- Should **ONLY** be used in development
- Is **NOT** suitable for production use
- Requires `allowInsecureContext: true` in OIDC config

**Production environments MUST use HTTPS.**

### Authentication

The package uses react-oidc-context for authentication:

- Tokens are stored in browser memory by default
- Configure PKCE (Proof Key for Code Exchange) for public clients
- Use secure, HttpOnly cookies for tokens when possible
- Implement proper token refresh mechanisms

## Disclosure Policy

When a security vulnerability is confirmed:

1. A patch will be developed and tested
2. A security advisory will be published
3. A new version will be released
4. Users will be notified through:
   - GitHub Security Advisories
   - Release notes
   - npm security advisories

We aim to resolve critical vulnerabilities within 7 days of confirmation.

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue.
