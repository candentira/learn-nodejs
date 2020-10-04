const { Sequelize } = require('sequelize');

class PostgresqlORM {
    async init() {
        this.sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }

    destroy() {
        if (this.sequelize) {
            return this.sequelize.close();
        }
    }
}

export default new PostgresqlORM();
