import * as express from 'express';
import { Container, decorate, injectable, interfaces } from 'inversify';

import { App, AppToken } from './app';
import { InjectionToken } from './injection-token';

const container = new Container();

// express
container.bind<express.Application>(InjectionToken.ExpressApplicationToken)
    .toDynamicValue((context: interfaces.Context) => {
        return express();
    });

// app
container.bind<App>(AppToken).to(App);

export { container };
