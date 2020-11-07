const { Sequelize } = require('sequelize');

class PostgresqlORM {
    async init() {
        this.sequelize = new Sequelize(process.env.CONNECTION_STRING);
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
