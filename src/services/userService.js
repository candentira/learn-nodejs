const { Op } = require('sequelize');
import User from '../models/user';
import logger from '../logging';

class UserService {
    getAllUsers() {
        logger.info('Service: executing UserService.getAllUsers');
        return User.findAll();
    }

    getUserById(id) {
        logger.info(`Service: executing UserService.getUserById(id = ${id})`);
        return User.findByPk(id);
    }

    createUser(userDTO) {
        logger.info(`Service: executing UserService.userDTO(userDTO = ${JSON.stringify(userDTO)})`);
        return User.create({ ...userDTO, isDeleted: false });
    }

    updateUser(id, userDTO) {
        logger.info(`Service: executing UserService.updateUser(id = ${id}, userDTO = ${JSON.stringify(userDTO)})`);
        return User.update(userDTO, { where: { id } });
    }

    deleteUser(id) {
        logger.info(`Service: executing UserService.deleteUser(id = ${id})`);
        return User.update({ is_deleted: true }, { where: { id } });
    }

    getAutoSuggestUsers(loginSubstring, limit) {
        logger.info(`Service: executing UserService.getAutoSuggestUsers(loginSubstring = ${loginSubstring}, limit = ${limit})`);
        return User.findAll({ where: { login: { [Op.like]: `%${loginSubstring}%` } } })
            .then(users => {
                return users.sort((a, b) => {
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
            });
    }
}

export default new UserService();
