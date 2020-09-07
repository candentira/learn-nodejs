const { Sequelize } = require('sequelize');

class PostgresqlORM {
    init() {
        this.sequelize = new Sequelize('postgres://jypfzbwx:aYUoFzUvmkdbT98u4D0X1RPXkAlxBBQt@lallah.db.elephantsql.com:5432/jypfzbwx');
        this.sequelize.authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch(err => console.error('Unable to connect to the database:', err));
    }

    async destroy() {
        if (this.sequelize) {
            return this.sequelize.close();
        }
    }
}

export default new PostgresqlORM();
