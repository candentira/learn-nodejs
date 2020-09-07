const { Sequelize, Op } = require('sequelize');
import { validateSchema } from './validation';
import { v4 as uuidv4 } from 'uuid';
import { userUpdateSchema, userCreateSchema } from './users.schema';
import User from './models/user';
import express from 'express';
const app = express();
const port = 3000;

const sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.use(express.json());

app.get('/users', (req, res) => {
    User.findAll()
        .then(users => res.send(JSON.stringify(users)))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Couldn\'t retrieve Users' });
        });
});

app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(user => res.json(user))
        .catch(err => {
            console.error(err);
            res.status(404).json({ message: `User with id ${req.params.id} not found` });
        });
});

app.get('/getAutoSuggestUsers', (req, res) => {
    const { loginSubstring, limit } = req.query;
    User.findAll({ where: { login: { [Op.like]: `%${loginSubstring}%` } } })
        .then(users => {
            const filtered = users.sort((a, b) => {
                const loginA = a.login;
                const loginB = b.login;
                if (loginA < loginB) {
                    return -1;
                }
                if (loginA > loginB) {
                    return 1;
                }
                return 0;
            }).slice(0, limit);
            res.json(filtered);
        })
        .catch(console.error);
});

app.post('/users', validateSchema(userCreateSchema), (req, res) => {
    User.create({ id: uuidv4(), ...req.body, isDeleted: false })
        .then(() => res.status(204).send())
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'User wasn\'t created' });
        });
});

app.put('/users/:id', validateSchema(userUpdateSchema), (req, res) => {
    const { id } = req.params;
    User.update(req.body, { where: { id } })
        .then(() => res.status(204).send())
        .catch(err => {
            console.error(err);
            res.status(404).json({ message: `User with id ${id} not found` });
        });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User.update({ is_deleted: true }, { where: { id } })
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
        });
});

app.listen(port, () => {
    console.log(`Task 3-1 app listening at http://localhost:${port}`);
});
