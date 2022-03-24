"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lastpayment", {
      lastpaymentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      paymentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: "no action",
        onUpdate: "no action",
        references: {
          model: "Payments",
          key: "paymentId",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Lastpayment");
  },
};
