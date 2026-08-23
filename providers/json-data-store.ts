import { FileUtils } from '@core/utilities/file-utils';

export class JsonDataStore<T> {
    private cache?: Record<string, T>;

    constructor(private readonly fileName: string) {}

    private get data(): Record<string, T> {
        if (!this.cache) {
            this.cache = FileUtils.readJson<Record<string, T>>(this.fileName);
        }
        return this.cache;
    }

    /**
     * Returns the record for `key`, throwing if it isn't present.
     */
    get(key: string): T {
        const record = this.data[key];
        if (!record) {
            throw new Error(`"${key}" not found in ${this.fileName}`);
        }
        return record;
    }

    /**
     * Returns every record in the file, keyed as-authored.
     */
    getAll(): Record<string, T> {
        return this.data;
    }
}