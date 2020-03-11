import path from "path";
import { transports, LoggerOptions, createLogger, format } from "winston";

const config: LoggerOptions = {
    exitOnError: false,
    level: "info",
    transports: [
        new transports.File({
            level: "info",
            filename: path.join(__dirname, "..", "logs", "app.log"),
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
            format: format.json()
        }),
        new transports.Console({
            level: "debug",
            handleExceptions: true,
            format: format.simple()
        })
    ]
};

const winston = createLogger(config);

export default winston;
