import env from 'dotenv';
const { Sequelize, DataTypes } = require('sequelize');

env.config();
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

export default sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
    is_deleted: 'isDeleted'
});
