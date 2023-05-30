const { Sequelize } = require("sequelize");
const sequelize = require("../config/database.js");

const Course = sequelize.define("courses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  course_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Course;