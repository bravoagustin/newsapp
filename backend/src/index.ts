import sequelize from './database/database';

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('---Successful connection PostgreSQL.');

        await sequelize.sync({ force: false });
        console.log('----Database synchronized successfully.');

    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

start();
