import { errorHandler } from './middleware/errorHandling/errorHandling.js';
import userRouter from './routers/userRouter.js';
import groupRouter from './routers/groupRouter.js';
import express from 'express';
import orm from './data-access/database';
import logger from './logging';
import loggerMiddleware from './middleware/logging/loggerMiddleware.js';

const app = express();
const port = 3000;
app.use(express.json());

orm.init();
app.use(loggerMiddleware);
app.use(userRouter);
app.use(groupRouter);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Learn NodeJS app listening at http://localhost:${port}`);
});

process.on('uncaughtException', (error) => {
    logger.error(`uncaughtException occured: ${error.message}`);
    orm.destroy();
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.warn(`unhandled Promise Rejection occured: ${reason.message}`);
});
