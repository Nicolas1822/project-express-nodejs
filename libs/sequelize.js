const { Sequelize } = require("sequelize");
const { config } = require("../config/config.js");
const setupModel = require("../db/model/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

setupModel(sequelize);

module.exports = sequelize;