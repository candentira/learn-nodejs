import env from 'dotenv';
const { Sequelize, DataTypes } = require('sequelize');

env.config();
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

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
