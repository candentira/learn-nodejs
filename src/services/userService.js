const { Op } = require('sequelize');
import User from '../models/user';

class UserService {
    getAllUsers() {
        return User.findAll();
    }

    getUserById(id) {
        return User.findByPk(id);
    }

    createUser(userDTO) {
        return User.create({ ...userDTO, isDeleted: false });
    }

    updateUser(id, userDTO) {
        return User.update(userDTO, { where: { id } });
    }

    deleteUser(id) {
        return User.update({ is_deleted: true }, { where: { id } });
    }

    getAutoSuggestUsers(loginSubstring, limit) {
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
