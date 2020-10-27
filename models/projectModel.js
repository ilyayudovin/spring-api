const { DataTypes } = require('sequelize');
const db = require('./../config/sequalizeConfig');

const Project = db.define('Project',{
  id: {
    type: DataTypes.STRING,
    primaryKey: true
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
  tableName: 'projects',
  timestamps: false
});

module.exports = Project;
