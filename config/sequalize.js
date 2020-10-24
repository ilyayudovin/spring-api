import Sequalize from "sequelize";

export const db = new Sequalize('spring', 'ilyayudovin', 'ilyayudovin123', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
