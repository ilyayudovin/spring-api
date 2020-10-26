import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from './../config/sequalizeConfig.js';

export const User = db.define('User',{
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.NUMBER
  },
},{
  tableName: 'users',
  timestamps: false
});
