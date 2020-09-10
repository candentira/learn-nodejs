import { validateSchema } from '../middleware/validation/validation';
import { userUpdateSchema, userCreateSchema } from '../middleware/validation/users.schema';
import userService from '../services/userService';

export const initUserRouter = ({ app }) => {
    app.get('/users', (req, res, next) => {
        userService.getAllUsers()
            .then(users => res.send(JSON.stringify(users)))
            .catch(err => {
                res.status(500).json({ message: 'Couldn\'t retrieve Users' });
                next(err);
            });
    });

    app.get('/users/:id', (req, res, next) => {
        const { id } = req.params;
        userService.getUserById(id)
            .then(user => res.json(user))
            .catch(err => {
                res.status(404).json({ message: `User with id ${req.params.id} not found` });
                next(err);
            });
    });

    app.get('/getAutoSuggestUsers', (req, res, next) => {
        const { loginSubstring, limit } = req.query;
        userService.getAutoSuggestUsers(loginSubstring, limit)
            .then(users => res.json(users))
            .catch(err => {
                res.status(500).json({ message: 'Couldn\'t suggest users' });
                next(err);
            });
    });

    app.post('/users', validateSchema(userCreateSchema), (req, res, next) => {
        const userDTO = req.body;
        userService.createUser(userDTO)
            .then(() => res.status(204).send())
            .catch(err => {
                res.status(500).json({ message: 'User wasn\'t created' });
                next(err);
            });
    });

    app.put('/users/:id', validateSchema(userUpdateSchema), (req, res, next) => {
        const { id } = req.params;
        const userDTO = req.body;
        userService.updateUser(id, userDTO)
            .then(() => res.status(204).send())
            .catch(err => {
                res.status(404).json({ message: `User with id ${id} not found` });
                next(err);
            });
    });

    app.delete('/users/:id', (req, res, next) => {
        const { id } = req.params;
        userService.deleteUser(id)
            .then(user => res.status(200).json(user))
            .catch(err => {
                res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
                next(err);
            });
    });

    return app;
};
