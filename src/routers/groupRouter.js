import groupService from '../services/groupService';
import express from 'express';

const router = express.Router();
router.route('/groups').get(async (req, res, next) => {
    try {
        const groups = await groupService.getAllGroups();
        res.send(JSON.stringify(groups));
    } catch (err) {
        res.status(500).json({ message: 'Couldn\'t retrieve Groups' });
        return next(err);
    }
});
router.route('/groups/:id').get(async (req, res, next) => {
    const { id } = req.params;
    try {
        const group = await groupService.getGroupById(id);
        res.json(group);
    } catch (err) {
        res.status(404).json({ message: `Group with id ${req.params.id} not found` });
        return next(err);
    }
});

router.route('/groups').post(async (req, res, next) => {
    const groupDTO = req.body;
    try {
        await groupService.createGroup(groupDTO);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Group wasn\'t created' });
        return next(err);
    }
});

router.route('/groups/:id').put(async (req, res, next) => {
    const { id } = req.params;
    const groupDTO = req.body;
    try {
        await groupService.updateGroup(id, groupDTO);
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ message: `Group with id ${id} not found` });
        return next(err);
    }
});

router.route('/groups/:id').delete(async (req, res, next) => {
    const { id } = req.params;
    try {
        const group = await groupService.deleteGroup(id);
        res.status(200).json(group);
    } catch (err) {
        res.status(404).json({ message: `Group with id ${req.params.id} was not deleted` });
        return next(err);
    }
});

router.route('/groups/:groupId/users').put((req, res, next) => {
    const { groupId } = req.params;
    const usersId = req.body;
    if (!groupId || !usersId || !Array.isArray(usersId)) {
        res.status(404).json({ message: 'Wrong addUsersToGroup parameters.' });
    }
    next();
}, async (req, res, next) => {
    const { groupId } = req.params;
    const usersId = req.body;
    try {
        await groupService.addUsersToGroup(groupId, usersId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
        return next(err);
    }
});

export default router;
