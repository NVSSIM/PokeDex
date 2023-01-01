import {Sequelize} from "sequelize";
import config from '../../config/config.js';

const database = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host:config.host,
        dialect:config.dialect,
        logging: false
    },
);

(async () => {
    try {
        await database.authenticate()
    } catch (error) {
        console.error(error)
    }
})()

export default database