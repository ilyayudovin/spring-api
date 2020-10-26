import Sequalize from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const db = new Sequalize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
