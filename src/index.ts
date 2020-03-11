import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Connection, createConnection } from "typeorm";

import winston from "./logger";
import * as ApiRouters from './routes';
import verifyJwt from "./middleware/verify-jwt.middleware";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

logHeading("database", "init");
createConnection().then((connection: Connection) => {
    if (!connection.isConnected) {
        winston.error("Database connection appears to have failed, please check your database config in .env");
        process.exit(1);
    }

    winston.info("Database connection established OK");
    winston.debug("Synchronising database...");
    connection.synchronize().then(() => {
        winston.info("Database synchronised with entities OK");

        app.use(verifyJwt);

        logHeading("routers", "init");
        Object.values(ApiRouters).forEach((router: any) => {
            const instance: any = new router();
            app.use(instance.path, instance.router);
            winston.debug(`Initialised router for ${instance.path} OK`);
        });
        winston.debug("Routers initialised OK");

        logHeading("express", "server");
        app.listen(port, () => {
            winston.info(process.env.APP_NAME);
            winston.info(`Server started - listening on port ${port}`);
            logHeading("app", "activity");
        });
    });
});

function logHeading(title: string, stage: string): void {
    winston.info(`\r\n ---------- ${title.toUpperCase()} ${stage.toUpperCase()} ---------- \r\n`);
}
