import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from './../config/sequalizeConfig.js';

export const Project = db.define('Project',{
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
