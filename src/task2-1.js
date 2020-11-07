/*
OBSOLETE
*/

const { Sequelize } = require('sequelize');
import { validateSchema } from './validation';
import { userUpdateSchema, userCreateSchema } from './users.schema';
import UserService from './services/userService';
import express from 'express';
const app = express();
const port = 3000;

const sequelize = new Sequelize(process.env.CONNECTION_STRING);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.use(express.json());

app.get('/users', (req, res) => {
    UserService.getAllUsers()
        .then(users => res.send(JSON.stringify(users)))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Couldn\'t retrieve Users' });
        });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    UserService.getUserById(id)
        .then(user => res.json(user))
        .catch(err => {
            console.error(err);
            res.status(404).json({ message: `User with id ${req.params.id} not found` });
        });
});

app.get('/getAutoSuggestUsers', (req, res) => {
    const { loginSubstring, limit } = req.query;
    UserService.getAutoSuggestUsers(loginSubstring, limit)
        .then(users => res.json(users))
        .catch(console.error);
});

app.post('/users', validateSchema(userCreateSchema), (req, res) => {
    const userDTO = req.body;
    UserService.createUser(userDTO)
        .then(() => res.status(204).send())
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'User wasn\'t created' });
        });
});

app.put('/users/:id', validateSchema(userUpdateSchema), (req, res) => {
    const { id } = req.params;
    const userDTO = req.body;
    UserService.updateUser(id, userDTO)
        .then(() => res.status(204).send())
        .catch(err => {
            console.error(err);
            res.status(404).json({ message: `User with id ${id} not found` });
        });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    UserService.deleteUser(id)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
        });
});

app.listen(port, () => {
    console.log(`Task 3-1 app listening at http://localhost:${port}`);
});
