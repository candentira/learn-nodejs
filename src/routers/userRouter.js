import { validateSchema } from '../middleware/validation/validation';
import { userUpdateSchema, userCreateSchema } from '../middleware/validation/users.schema';
import userService from '../services/userService';
import express from 'express';

const router = express.Router();
router.route('/users').get(async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(JSON.stringify(users));
    } catch (err) {
        res.status(500).json({ message: 'Couldn\'t retrieve Users' });
        return next(err);
    }
});
router.route('/users/:id').get(async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: `User with id ${req.params.id} not found` });
        return next(err);
    }
});

router.route('/getAutoSuggestUsers').get(async (req, res, next) => {
    const { loginSubstring, limit } = req.query;
    try {
        const users = await userService.getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Couldn\'t suggest users' });
        return next(err);
    }
});

router.route('/users').post(validateSchema(userCreateSchema), async (req, res, next) => {
    const userDTO = req.body;
    try {
        await userService.createUser(userDTO);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'User wasn\'t created' });
        return next(err);
    }
});

router.route('/users/:id').put(validateSchema(userUpdateSchema), async (req, res, next) => {
    const { id } = req.params;
    const userDTO = req.body;
    try {
        await userService.updateUser(id, userDTO);
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ message: `User with id ${id} not found` });
        return next(err);
    }
});

router.route('/users/:id').delete(async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUser(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: `User with id ${req.params.id} was not deleted` });
        return next(err);
    }
});

export default router;
