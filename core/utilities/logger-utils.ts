export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

export class Logger {
    private static logLevel: LogLevel = LogLevel.INFO;
    private static context: string = '';

    static setLogLevel(level: LogLevel): void {
        Logger.logLevel = level;
    }

    static setContext(context: string): void {
        Logger.context = context;
    }

    private static shouldLog(level: LogLevel): boolean {
        return level >= Logger.logLevel;
    }

    private static formatMessage(level: string, message: string): string {
        const timestamp = new Date().toISOString();
        const context = Logger.context ? `[${Logger.context}]` : '';
        return `[${timestamp}] [${level}]${context} ${message}`;
    }

    static debug(message: string, ...args: any[]): void {
        if (Logger.shouldLog(LogLevel.DEBUG)) {
            console.debug(Logger.formatMessage('DEBUG', message), ...args);
        }
    }

    static info(message: string, ...args: any[]): void {
        if (Logger.shouldLog(LogLevel.INFO)) {
            console.info(Logger.formatMessage('INFO', message), ...args);
        }
    }

    static warn(message: string, ...args: any[]): void {
        if (Logger.shouldLog(LogLevel.WARN)) {
            console.warn(Logger.formatMessage('WARN', message), ...args);
        }
    }

    static error(message: string, ...args: any[]): void {
        if (Logger.shouldLog(LogLevel.ERROR)) {
            console.error(Logger.formatMessage('ERROR', message), ...args);
        }
    }
}