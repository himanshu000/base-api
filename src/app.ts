import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import express = require('express');

export class App {
    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.configure();
    }

    private configure() {
        this.addGlobalMiddlewares();
        this.configureRoutes();
    }

    private addGlobalMiddlewares() {
        this.expressApp.use(bodyParser.json({ limit: '50mb' }));
        this.expressApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
        this.expressApp.use(this.setHeaders);
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({
            extended: true,
        }));
    }

    private setHeaders = (req: Request, res: Response, next: NextFunction) => {
        // Setting CORS headers
        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', req.headers.origin[0]);
        }
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        if ('OPTIONS' === req.method) {
            res.status(200).send();
        } else {
            next();
        }
    }

    private configureRoutes() {
        this.expressApp.use('/', (req, res) => res.send('Hello World!'));
    }
}
