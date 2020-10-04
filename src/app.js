import { consoleErrorhandler } from './middleware/errorHandling/errorHandling.js';
import userRouter from './routers/userRouter.js';
import express from 'express';
import orm from './data-access/database';

const app = express();
const port = 3000;
app.use(express.json());

orm.init();
app.use(userRouter);
app.use(consoleErrorhandler);

app.listen(port, () => {
    console.log(`Task 3-1 app listening at http://localhost:${port}`);
});
