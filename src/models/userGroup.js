import User from './user';
import Group from './group';

User.belongsToMany(Group, {
    through: 'UserGroups'
});

Group.belongsToMany(User, {
    through: 'UserGroups'
});
