import Sequelize from "sequelize";
import db from "../database.js";


const User = db.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    passwordhash: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false,
});

export default User;