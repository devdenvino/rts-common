import { type StateStore } from "oidc-client-ts";

const LEGACY_STORAGE_KEY = "oidc.user";

type LegacyEntry = {
  key: string;
  value: string;
};

/**
 * A simple localStorage-backed StateStore for oidc-client-ts.
 *
 * Replaces the previous @tanstack/db implementation which depended on an
 * experimental alpha package unsuitable for production OIDC token storage.
 * localStorage is the same backing store oidc-client-ts uses by default,
 * so behaviour is identical — this class just makes the dependency explicit
 * and keeps the export name stable for any existing consumers.
 */
export class TanStackAuthStore implements StateStore {
  private readonly prefix: string;

  constructor(prefix = "oidc.") {
    this.prefix = prefix;
    this.migrateLegacyStoreIfNeeded();
  }

  private hasStorage(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  private isLegacyEntry(value: unknown): value is LegacyEntry {
    if (!value || typeof value !== "object") {
      return false;
    }
    const candidate = value as Record<string, unknown>;
    return typeof candidate.key === "string" && typeof candidate.value === "string";
  }

  private extractLegacyEntries(input: unknown): LegacyEntry[] {
    const entries: LegacyEntry[] = [];
    const stack: unknown[] = [input];

    while (stack.length > 0) {
      const current = stack.pop();
      if (!current) {
        continue;
      }

      if (this.isLegacyEntry(current)) {
        entries.push(current);
      }

      if (Array.isArray(current)) {
        for (const item of current) {
          stack.push(item);
        }
        continue;
      }

      if (typeof current === "object") {
        for (const nestedValue of Object.values(current as Record<string, unknown>)) {
          if (nestedValue && (typeof nestedValue === "object" || Array.isArray(nestedValue))) {
            stack.push(nestedValue);
          }
        }
      }
    }

    return entries;
  }

  private migrateLegacyStoreIfNeeded(): void {
    if (!this.hasStorage()) {
      return;
    }

    try {
      const storage = window.localStorage;
      const raw = storage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const entries = this.extractLegacyEntries(JSON.parse(raw));
      for (const { key, value } of entries) {
        const targetKey = this.prefix + key;
        if (!storage.getItem(targetKey)) {
          storage.setItem(targetKey, value);
        }
      }

      storage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Ignore malformed legacy payloads or unavailable storage environments.
    }
  }

  set(key: string, value: string): Promise<void> {
    if (!this.hasStorage()) {
      return Promise.resolve();
    }

    try {
      window.localStorage.setItem(this.prefix + key, value);
    } catch {
      // Ignore storage write failures (quota/private mode restrictions).
    }

    return Promise.resolve();
  }

  get(key: string): Promise<string | null> {
    if (!this.hasStorage()) {
      return Promise.resolve(null);
    }

    try {
      return Promise.resolve(window.localStorage.getItem(this.prefix + key));
    } catch {
      return Promise.resolve(null);
    }
  }

  remove(key: string): Promise<string | null> {
    if (!this.hasStorage()) {
      return Promise.resolve(null);
    }

    try {
      const storage = window.localStorage;
      const value = storage.getItem(this.prefix + key);
      storage.removeItem(this.prefix + key);
      return Promise.resolve(value);
    } catch {
      return Promise.resolve(null);
    }
  }

  getAllKeys(): Promise<string[]> {
    if (!this.hasStorage()) {
      return Promise.resolve([]);
    }

    try {
      const keys = Object.keys(window.localStorage)
        .filter((k) => k.startsWith(this.prefix))
        .map((k) => k.slice(this.prefix.length));
      return Promise.resolve(keys);
    } catch {
      return Promise.resolve([]);
    }
  }
}
