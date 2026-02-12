import { type StateStore } from "oidc-client-ts";
import { createCollection, localStorageCollectionOptions } from "@tanstack/db";

/**
 * A custom StateStore implementation for oidc-client-ts that uses @tanstack/db
 * to persist and sync auth tokens across tabs.
 */
// Define the data shape for our auth storage
type AuthData = {
  key: string;
  value: string;
};

export class TanStackAuthStore implements StateStore {
  private collection;

  constructor() {
    this.collection = createCollection(
      localStorageCollectionOptions<AuthData, string>({
        storageKey: "oidc.user",
        getKey: (item) => item.key,
      }),
    );
  }

  async set(key: string, value: string): Promise<void> {
    if (this.collection.has(key)) {
      this.collection.update(key, (draft) => {
        draft.value = value;
      });
    } else {
      this.collection.insert({ key, value });
    }
  }

  async get(key: string): Promise<string | null> {
    const item = this.collection.get(key);
    return item ? item.value : null;
  }

  async remove(key: string): Promise<string | null> {
    const item = this.collection.get(key);
    this.collection.delete(key);
    return item ? item.value : null;
  }

  async getAllKeys(): Promise<string[]> {
    const keys: string[] = [];
    for (const key of this.collection.keys()) {
      keys.push(key);
    }
    return keys;
  }
}
