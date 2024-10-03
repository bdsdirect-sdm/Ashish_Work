
import { Sequelize } from "sequelize";
import config from "../utils/validateEnv"

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {host: config.db.host,
        port: config.db.port,
        dialect:'mysql',
        logging: false,
    }
   
);
export default sequelize;