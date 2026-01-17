var _a;
const LOGGER = (_a = process.env.LOGGER) !== null && _a !== void 0 ? _a : 'pino';
/*
 * Logger
 * By default, the logger is set to use Pino. To change the logger, update the import statement below.
 * to your desired logger implementation.
 */
async function getLogger() {
    switch (LOGGER) {
        case 'pino': {
            const { Logger: PinoLogger } = await import('./loggers/pino');
            return PinoLogger;
        }
        default:
            throw new Error(`Unknown logger: ${process.env.LOGGER}`);
    }
}
export { getLogger };
//# sourceMappingURL=index.js.map