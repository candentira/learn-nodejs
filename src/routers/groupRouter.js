import groupService from '../services/groupService';
import express from 'express';

const router = express.Router();

export const getGroups = async (req, res, next) => {
    try {
        const groups = await groupService.getAllGroups();
        res.send(JSON.stringify(groups));
    } catch (err) {
        err.customErrorMessage = 'Couldn\'t retrieve Groups';
        return next(err);
    }
};

export const getGroupsById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const group = await groupService.getGroupById(id);
        if (group) {
            res.json(group);
        } else {
            throw Error();
        }
    } catch (err) {
        err.customErrorMessage = `Group with id ${req.params.id} not found`;
        return next(err);
    }
};

export const postGroups = async (req, res, next) => {
    const groupDTO = req.body;
    try {
        await groupService.createGroup(groupDTO);
        res.status(204).send();
    } catch (err) {
        err.customErrorMessage = 'Group wasn\'t created';
        return next(err);
    }
};
export const putGroupsById = async (req, res, next) => {
    const { id } = req.params;
    const groupDTO = req.body;
    try {
        await groupService.updateGroup(id, groupDTO);
        res.status(204).send();
    } catch (err) {
        err.customErrorMessage = `Group with id ${id} not found`;
        return next(err);
    }
};

export const deleteGroupsById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const group = await groupService.deleteGroup(id);
        res.status(200).json(group);
    } catch (err) {
        err.customErrorMessage = `Group with id ${req.params.id} was not deleted`;
        return next(err);
    }
};

export const putUsersIntoGroup = async (req, res, next) => {
    const { groupId } = req.params;
    const usersId = req.body;
    try {
        await groupService.addUsersToGroup(groupId, usersId);
        res.status(204).send();
    } catch (err) {
        return next(err);
    }
};

router.route('/groups').get(getGroups);

router.route('/groups/:id').get(getGroupsById);

router.route('/groups').post(postGroups);

router.route('/groups/:id').put(putGroupsById);

router.route('/groups/:id').delete(deleteGroupsById);

router.route('/groups/:groupId/users').put((req, res, next) => {
    const { groupId } = req.params;
    const usersId = req.body;
    if (!groupId || !usersId || !Array.isArray(usersId)) {
        res.status(404).json({ message: 'Wrong addUsersToGroup parameters.' });
    }
    next();
}, putUsersIntoGroup);

export default router;
