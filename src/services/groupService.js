import Group from '../models/group';

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
}

export default new GroupService();
