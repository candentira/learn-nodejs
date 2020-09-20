import Group from '../models/group';
import User from '../models/user';
import userGroups from '../models/userGroup';

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');

class GroupService {
    getAllGroups() {
        return Group.findAll();
    }

    getGroupById(id) {
        return Group.findByPk(id);
    }

    createGroup(groupDTO) {
        return Group.create(groupDTO);
    }

    updateGroup(id, groupDTO) {
        return Group.update(groupDTO, { where: { id } });
    }

    deleteGroup(id) {
        return Group.destroy({ where: { id } });
    }

    async addUsersToGroup(groupId, usersId) {
        console.log(usersId);
        if (!groupId || !usersId || !Array.isArray(usersId)) {
            const error = new Error('Wrong addUsersToGroup parameters.');
            error.status = 404;
            throw error;
        }
        await sequelize.transaction(async (t) => {
            const group = await Group.findByPk(groupId, { transaction: t });
            if (!group) {
                const error = new Error('Group not found.');
                error.status = 404;
                throw error;
            }
            for (const userId of usersId) {
                const user = await User.findByPk(userId, { transaction: t });
                if (!user) {
                    const error = new Error('User not found.');
                    error.status = 404;
                    throw error;
                }
                await user.addGroup(group, { transaction: t });
            }
            return;
        });
        console.log('Added Users to Group');
    }
}

export default new GroupService();
