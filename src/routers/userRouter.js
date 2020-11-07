import { validateSchema } from '../middleware/validation/validation';
import { userUpdateSchema, userCreateSchema } from '../middleware/validation/users.schema';
import userService from '../services/userService';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(JSON.stringify(users));
    } catch (err) {
        err.customErrorMessage = 'Couldn\'t retrieve Users';
        return next(err);
    }
};

export const getUsersById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            throw Error();
        }
    } catch (err) {
        err.customErrorMessage = `User with id ${req.params.id} not found`;
        return next(err);
    }
};

export const getAutoSuggestUsers = async (req, res, next) => {
    const { loginSubstring, limit } = req.query;
    try {
        const users = await userService.getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    } catch (err) {
        err.customErrorMessage = 'Couldn\'t suggest users';
        return next(err);
    }
};

export const postUsers = async (req, res, next) => {
    const userDTO = req.body;
    try {
        await userService.createUser(userDTO);
        res.status(204).send();
    } catch (err) {
        err.customErrorMessage = 'User wasn\'t created';
        return next(err);
    }
};

export const putUsersById = async (req, res, next) => {
    const { id } = req.params;
    const userDTO = req.body;
    try {
        await userService.updateUser(id, userDTO);
        res.status(204).send();
    } catch (err) {
        err.customErrorMessage =  `User with id ${id} not found`;
        return next(err);
    }
};

export const deleteUsersById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUser(id);
        res.status(200).json(user);
    } catch (err) {
        err.customErrorMessage = `User with id ${req.params.id} was not deleted`;
        return next(err);
    }
};

export const postLogin = async (req, res, next) => {
    const { login, password } = req.body;
    try {
        const user = await userService.authenticate(login, password);
        if (user) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json(accessToken);
        } else {
            res.status(403).send();
        }
    } catch (err) {
        err.customErrorMessage = 'User couldn\'t be found';
        return next(err);
    }
};

router.route('/users').get(getUsers);

router.route('/users/:id').get(getUsersById);

router.route('/getAutoSuggestUsers').get(getAutoSuggestUsers);

router.route('/users').post(validateSchema(userCreateSchema), postUsers);

router.route('/users/:id').put(validateSchema(userUpdateSchema), putUsersById);

router.route('/users/:id').delete(deleteUsersById);

router.route('/login').post(postLogin);

export default router;
