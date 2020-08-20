import { USERS_LIST } from './constants';
import userSchema from './users.schema';
import { validateSchema } from './validation';
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/users', (req, res) => {
    res.send(JSON.stringify(USERS_LIST));
});

app.get('/users/:id', (req, res) => {
    const user = USERS_LIST.find(item => item.id === req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
});

app.get('/getAutoSuggestUsers', (req, res) => {
    const { loginSubstring, limit } = req.query;
    const filtered = USERS_LIST.filter(user => user.login.includes(loginSubstring))
        .sort((a, b) => {
            const loginA = a.login;
            const loginB = b.login;
            if (loginA < loginB) {
                return -1;
            }
            if (loginA > loginB) {
                return 1;
            }
            return 0;
        })
        .slice(0, limit);
    res.json(filtered);
});

app.post('/users', validateSchema(userSchema), (req, res) => {
    const user = req.body;
    if (user) {
        USERS_LIST.push(user);
        res.status(204).send();
    }
});

app.put('/users', validateSchema(userSchema), (req, res) => {
    const newUser = req.body;
    const userIndex = USERS_LIST.findIndex(user => user.id === newUser.id);
    if (userIndex >= 0) {
        USERS_LIST[userIndex] = newUser;
        res.status(204).send();
    } else {
        res.status(404).json({ message: `User with id ${newUser.id} not found` });
    }
});

app.delete('/users/:id', (req, res) => {
    const user = USERS_LIST.find(item => item.id === req.params.id);
    if (user) {
        user.isDeleted = true;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
    }
});

app.listen(port, () => {
    console.log(`Task 2-1 app listening at http://localhost:${port}`);
});
