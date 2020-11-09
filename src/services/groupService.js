import Group from '../models/group';
import User from '../models/user';
import logger from '../logging';
import env from 'dotenv';

env.config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

class GroupService {
    getAllGroups() {
        logger.info('Service: executing GroupService.getAllGroups');
        return Group.findAll();
    }

    getGroupById(id) {
        logger.info(`Service: executing GroupService.getGroupById(id = ${id})`);
        return Group.findByPk(id);
    }

    createGroup(groupDTO) {
        logger.info(`Service: executing GroupService.createGroup(groupDTO = ${JSON.stringify(groupDTO)})`);
        return Group.create(groupDTO);
    }

    updateGroup(id, groupDTO) {
        logger.info(`Service: executing GroupService.updateGroup(id = ${id}, groupDTO = ${JSON.stringify(groupDTO)})`);
        return Group.update(groupDTO, { where: { id } });
    }

    deleteGroup(id) {
        logger.info(`Service: executing GroupService.deleteGroup(id = ${id})`);
        return Group.destroy({ where: { id } });
    }

    async addUsersToGroup(groupId, usersId) {
        logger.info(`Service: executing GroupService.addUsersToGroup(groupId = ${groupId}, usersId = ${usersId})`);
        await sequelize.transaction(async (t) => {
            const group = await Group.findByPk(groupId, { transaction: t });
            if (!group) {
                throw new Error('Group not found.');
            }
            for (const userId of usersId) {
                const user = await User.findByPk(userId, { transaction: t });
                if (!user) {
                    throw new Error('User not found.');
                }
                await user.addGroup(group, { transaction: t });
            }
            return;
        });
    }
}

export default new GroupService();
