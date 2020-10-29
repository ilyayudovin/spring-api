'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable('project', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('project');
  }
};
