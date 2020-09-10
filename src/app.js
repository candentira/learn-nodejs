import { consoleErrorhandler } from './middleware/errorHandling/errorHandling.js';
import { initBaseRouter } from './routers';
import express from 'express';
import orm from './data-access/database';

async function startServer() {
    const app = express();
    const port = 3000;
    app.use(express.json());

    orm.init();
    initBaseRouter({ app });
    app.use(consoleErrorhandler);

    app.listen(port, () => {
        console.log(`Task 3-1 app listening at http://localhost:${port}`);
    });
}

startServer();
