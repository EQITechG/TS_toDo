import { Sequelize, DataTypes } from "sequelize";
//Squelze DB Config
const db = new Sequelize("app", "", "", {
  storage: ".database.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default db;
