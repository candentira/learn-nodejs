const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');

const PERMISSION_TYPES = {
    READ: 'READ',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    SHARE: 'SHARE',
    UPLOAD_SHARE: 'UPLOAD_SHARE'
};

export default sequelize.define('Group', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ENUM(Object.values(PERMISSION_TYPES)),
        allowNull: false,
        defaultValue: PERMISSION_TYPES.READ
    }
}, {
    tableName: 'groups',
    createdAt: false,
    updatedAt: false
});
