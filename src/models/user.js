const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');

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
