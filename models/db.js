import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "sql12800096", // database
  "sql12800096", // username
  "GNafgSl45K",  // password
  {
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
    port: 3306,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;
