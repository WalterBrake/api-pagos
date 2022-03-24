"use strict";

const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    let paymentsData = [];
    const usersFound = await User.findAll({
      attributes: ["userId"],
    });
    if (usersFound.length > 0) {
      for (let u in usersFound) {
        paymentsData.push(
          {
            userId: usersFound[u].dataValues.userId,
            monto: 624,
          },
          {
            userId: usersFound[u].dataValues.userId,
            monto: 624,
          }
        );
      }
    }

    return queryInterface.bulkInsert("Payments", paymentsData);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query("SET FOREIGN_KEY_CHECKS = 0")
      .then(() => {
        return queryInterface.bulkDelete("Payments", {});
      })
      .then(() => {
        return queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
      });
  },
};
