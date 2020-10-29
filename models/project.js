const { DataTypes } = require('sequelize');
const db = require('../sequelizeConfig/sequalizeConfig');

const Project = db.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
},{
  tableName: 'project',
  timestamps: false
});

module.exports = Project;
