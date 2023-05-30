const { Sequelize } = require("sequelize");
require('dotenv').config()

//Initializing connection
const sequelize = new Sequelize( "courses" , "root", "", {
    dialect: "mysql",
    host: "localhost",
});
  
//Sync DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;