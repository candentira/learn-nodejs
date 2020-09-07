import express from 'express';
import routers from './routers';
import orm from './data-access/database';

async function startServer() {
    const app = express();
    const port = 3000;
    app.use(express.json());

    orm.init();
    routers.init({ app });

    app.listen(port, () => {
        console.log(`Task 3-1 app listening at http://localhost:${port}`);
    });
}

startServer();
