import Sequelize from "sequelize";
import config from "./utils/config.js";

const db = new Sequelize.Sequelize(config.DB_NAME, config.DB_UN, config.DB_PW, {
    host: "localhost",
    dialect: "postgres",
  });

export default db;
  