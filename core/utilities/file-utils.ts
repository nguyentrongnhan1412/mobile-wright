import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './logger-utils';

export class FileUtils {
    private static readonly dataRoot: string = path.resolve(process.cwd(), 'data');

    private static resolvePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : path.join(FileUtils.dataRoot, filePath);
    }

    /**
     * Reads and parses a JSON file.
     * @param filePath Path to the JSON file, relative to `data/` (or absolute).
     * @returns The parsed JSON content, typed as T.
     */
    static readJson<T = any>(filePath: string): T {
        const resolvedPath = FileUtils.resolvePath(filePath);

        if (!fs.existsSync(resolvedPath)) {
            Logger.error(`JSON file not found: ${resolvedPath}`);
            throw new Error(`JSON file not found: ${resolvedPath}`);
        }

        try {
            const raw = fs.readFileSync(resolvedPath, 'utf-8');
            return JSON.parse(raw) as T;
        } catch (error) {
            Logger.error(`Failed to read/parse JSON file: ${resolvedPath}`, error);
            throw new Error(`Failed to read/parse JSON file: ${resolvedPath} - ${(error as Error).message}`);
        }
    }

    /**
     * Reads a specific key from a JSON file.
     * @param filePath Path to the JSON file, relative to `data/` (or absolute).
     * @param key Top-level key to extract.
     */
    static readJsonKey<T = any>(filePath: string, key: string): T {
        const data = FileUtils.readJson<Record<string, any>>(filePath);

        if (!(key in data)) {
            Logger.error(`Key "${key}" not found in JSON file: ${filePath}`);
            throw new Error(`Key "${key}" not found in JSON file: ${filePath}`);
        }

        return data[key] as T;
    }

    /**
     * Writes an object to a JSON file (useful for test setup/teardown or caching generated data).
     * @param filePath Path to the JSON file, relative to `data/` (or absolute).
     * @param data The data to serialize.
     */
    static writeJson(filePath: string, data: unknown): void {
        const resolvedPath = FileUtils.resolvePath(filePath);
        const dir = path.dirname(resolvedPath);

        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            Logger.error(`Failed to write JSON file: ${resolvedPath}`, error);
            throw new Error(`Failed to write JSON file: ${resolvedPath} - ${(error as Error).message}`);
        }
    }

    /**
     * Checks whether a file exists.
     * @param filePath Path to the file, relative to `data/` (or absolute).
     */
    static exists(filePath: string): boolean {
        return fs.existsSync(FileUtils.resolvePath(filePath));
    }
}