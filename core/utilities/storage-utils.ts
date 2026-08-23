import { Logger } from './logger-utils';

/**
 * In-memory key-value storage for sharing data across steps within a single test case
 * (e.g. caching an auth token from a login API call so it doesn't need to be re-fetched
 * on every subsequent request).
 *
 * Intended to be cleared after each test - wire `TestStorage.clear()` into a fixture's
 * teardown (or an `afterEach` hook) so state never leaks between test cases.
 */
export class TestStorage {
    private static store: Map<string, unknown> = new Map();

    /**
     * Stores a value under the given key, overwriting any existing value.
     */
    static set<T = unknown>(key: string, value: T): void {
        Logger.debug(`TestStorage: set "${key}"`);
        TestStorage.store.set(key, value);
    }

    /**
     * Retrieves a value by key.
     * @throws if the key does not exist and no default value is provided.
     */
    static get<T = unknown>(key: string): T {
        if (!TestStorage.store.has(key)) {
            Logger.error(`TestStorage: key "${key}" not found`);
            throw new Error(`TestStorage: key "${key}" not found`);
        }
        return TestStorage.store.get(key) as T;
    }

    /**
     * Retrieves a value by key, returning `defaultValue` if the key does not exist.
     */
    static getOrDefault<T = unknown>(key: string, defaultValue: T): T {
        return TestStorage.store.has(key) ? (TestStorage.store.get(key) as T) : defaultValue;
    }

    /**
     * Checks whether a key exists in storage.
     */
    static has(key: string): boolean {
        return TestStorage.store.has(key);
    }

    /**
     * Removes a single key from storage.
     */
    static delete(key: string): void {
        TestStorage.store.delete(key);
    }

    /**
     * Clears all stored data. Call this after each test case (e.g. in a fixture teardown
     * or `test.afterEach`) to prevent state leaking into the next test.
     */
    static clear(): void {
        Logger.debug(`TestStorage: clearing ${TestStorage.store.size} entr${TestStorage.store.size === 1 ? 'y' : 'ies'}`);
        TestStorage.store.clear();
    }
}