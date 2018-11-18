import * as http from 'http';
import { App } from './app';

export class Server {
    private port: number;
    private isHttps: boolean;

    constructor(port: number, isHttps: boolean = false) {
        this.port = port;
        this.isHttps = isHttps;
    }

    public start() {
        const app = new App();
        const httpServer = http.createServer(app.expressApp);
        httpServer.listen(this.port);
        httpServer.on('error', (err) => {
            console.log('An Unhandled error has occured', err.message);
        });
        httpServer.on('listening', () => {
            const bind = typeof this.port === 'string'
                ? 'Pipe ' + this.port
                : 'Port ' + this.port;
            console.log('Listening on ' + bind);
        });
        process.on('unhandledRejection', (error: any) => {
            console.log(error);
        });
        process.on('uncaughtException', (error: any) => {
            console.log(error);
        });
    }
}
