'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.UUID,//数据类型
        defaultValue:Sequelize.UUIDV1,
        primaryKey: true,//主键
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:'api'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('coupons');
  }
};