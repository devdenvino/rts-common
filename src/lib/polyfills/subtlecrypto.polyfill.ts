/**
 * SubtleCrypto polyfill for non-secure contexts (HTTP)
 *
 * This polyfill is needed when running the application over HTTP (non-HTTPS)
 * and using OIDC authentication with PKCE, which requires crypto.subtle.
 *
 * Only enable this in development environments where HTTPS is not available.
 *
 * @module lib/polyfills/subtlecrypto
 */

/// <reference types="vite/client" />
import type * as ForgeTypes from 'node-forge';

export async function setupCryptoPolyfill() {
  if (import.meta.env.DEV) {
    console.log('[Polyfill] Setting up Crypto polyfill');
  }
  if (!window.isSecureContext) {
    if (import.meta.env.DEV) {
      console.warn(
        '[Polyfill] Your environment is not secure (not HTTPS). Mocking Crypto.subtle for development purposes.'
      );
    }

    if (!globalThis.crypto) {
      // @ts-expect-error - Polyfilling crypto object
      globalThis.crypto = {};
    }

    // Dynamic import to avoid bundling node-forge when not needed
    const forge: typeof ForgeTypes = await import('node-forge');

    // @ts-expect-error - Polyfilling crypto.subtle with minimal implementation
    globalThis.crypto.subtle = {
      digest: async (algorithm: string, data: BufferSource) => {
        if (algorithm !== 'SHA-256') {
          throw new Error('Only SHA-256 is supported.');
        }
        const md = forge.md.sha256.create();
        md.update(
          forge.util.createBuffer(new Uint8Array(data as ArrayBuffer)).getBytes()
        );
        return new Uint8Array(
          md
            .digest()
            .bytes()
            .split('')
            .map((c: string) => c.charCodeAt(0))
        ).buffer;
      },

      generateKey: async (
        algorithm: EcKeyGenParams,
        _extractable: boolean,
        _keyUsages: string[]
      ) => {
        if (algorithm.name !== 'ECDSA' || algorithm.namedCurve !== 'P-256') {
          throw new Error('Only ECDSA with P-256 is supported.');
        }
        // @ts-expect-error - forge.pki.ec may not have proper types
        const keys = forge.pki.ec.generateKeyPair({ namedCurve: 'P-256' });
        return {
          privateKey: keys.privateKey,
          publicKey: keys.publicKey,
        };
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exportKey: async (format: string, key: any) => {
        if (format === 'jwk') {
          if (key.type === 'private') {
            // @ts-expect-error - forge.pki.privateKeyToJwk may not have proper types
            return forge.pki.privateKeyToJwk(key);
          } else if (key.type === 'public') {
            // @ts-expect-error - forge.pki.publicKeyToJwk may not have proper types
            return forge.pki.publicKeyToJwk(key);
          }
        }
        throw new Error('Unsupported export key format or type.');
      },

      sign: async (
        algorithm: EcdsaParams,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        privateKey: any,
        data: BufferSource
      ) => {
        if (
          algorithm.name !== 'ECDSA' ||
          (algorithm.hash as Algorithm).name !== 'SHA-256'
        ) {
          throw new Error('Only ECDSA with SHA-256 is supported.');
        }
        const md = forge.md.sha256.create();
        md.update(
          forge.util.createBuffer(new Uint8Array(data as ArrayBuffer)).getBytes()
        );
        const signature = privateKey.sign(md);
        return new Uint8Array(
          forge.util
            .createBuffer(signature)
            .bytes()
            .split('')
            .map((c: string) => c.charCodeAt(0))
        );
      },

      verify: async (
        algorithm: EcdsaParams,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        publicKey: any,
        signature: BufferSource,
        data: BufferSource
      ) => {
        if (
          algorithm.name !== 'ECDSA' ||
          (algorithm.hash as Algorithm).name !== 'SHA-256'
        ) {
          throw new Error('Only ECDSA with SHA-256 is supported.');
        }
        const md = forge.md.sha256.create();
        md.update(
          forge.util.createBuffer(new Uint8Array(data as ArrayBuffer)).getBytes()
        );
        return publicKey.verify(
          md.digest().bytes(),
          forge.util.createBuffer(signature as ArrayBuffer).getBytes()
        );
      },
    } as unknown as SubtleCrypto;
  }
}

/**
 * Conditionally apply the crypto polyfill based on config
 * Call this before initializing the OIDC provider
 */
export async function applyInsecureContextPolyfill() {
  // Access _env from window (declared in types.ts)
  const config = (window as Window & { _env?: { oidcConfig?: { allowInsecureContext?: boolean } } })._env;
  if (config?.oidcConfig?.allowInsecureContext && !window.isSecureContext) {
    await setupCryptoPolyfill();
  }
}
