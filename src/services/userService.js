const { Op } = require('sequelize');
import User from '../models/user';
import bcrypt from 'bcrypt';
import logger from '../logging';

class UserService {
    getAllUsers() {
        logger.info('Service: executing UserService.getAllUsers');
        return User.findAll();
    }

    async authenticate(login, password) {
        const user = await this.getUserByLogin(login);
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            return isValidPassword ? user : null;
        }
        return null;
    }

    getUserByLogin(login) {
        logger.info(`Service: executing UserService.getUserByLogin(name = ${login})`);
        return User.findOne({ where: { login } }).then(user => user.toJSON());
    }

    getUserById(id) {
        logger.info(`Service: executing UserService.getUserById(id = ${id})`);
        return User.findByPk(id);
    }

    async createUser(userDTO) {
        logger.info(`Service: executing UserService.userDTO(userDTO = ${JSON.stringify(userDTO)})`);
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        return User.create({ ...userDTO, isDeleted: false, password: hashedPassword });
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
