import { validateSchema } from './validation/validation';
import { userUpdateSchema, userCreateSchema } from './validation/users.schema';
import userService from '../services/userService';

class UserRouter {
    init({ app }) {
        app.get('/users', (req, res) => {
            userService.getAllUsers()
                .then(users => res.send(JSON.stringify(users)))
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Couldn\'t retrieve Users' });
                });
        });

        app.get('/users/:id', (req, res) => {
            const { id } = req.params;
            userService.getUserById(id)
                .then(user => res.json(user))
                .catch(err => {
                    console.error(err);
                    res.status(404).json({ message: `User with id ${req.params.id} not found` });
                });
        });

        app.get('/getAutoSuggestUsers', (req, res) => {
            const { loginSubstring, limit } = req.query;
            userService.getAutoSuggestUsers(loginSubstring, limit)
                .then(users => res.json(users))
                .catch(console.error);
        });

        app.post('/users', validateSchema(userCreateSchema), (req, res) => {
            const userDTO = req.body;
            userService.createUser(userDTO)
                .then(() => res.status(204).send())
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'User wasn\'t created' });
                });
        });

        app.put('/users/:id', validateSchema(userUpdateSchema), (req, res) => {
            const { id } = req.params;
            const userDTO = req.body;
            userService.updateUser(id, userDTO)
                .then(() => res.status(204).send())
                .catch(err => {
                    console.error(err);
                    res.status(404).json({ message: `User with id ${id} not found` });
                });
        });

        app.delete('/users/:id', (req, res) => {
            const { id } = req.params;
            userService.deleteUser(id)
                .then(user => res.status(200).json(user))
                .catch(err => {
                    console.log(err);
                    res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
                });
        });

        return app;
    }
}

export default new UserRouter();
