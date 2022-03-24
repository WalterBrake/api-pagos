"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let usersData = [
      { name: "Juan Perez", telephone: "4567456" },
      { name: "john Smith", telephone: "567547" },
    ];

    return queryInterface.bulkInsert("Users", usersData);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query("SET FOREIGN_KEY_CHECKS = 0")
      .then(() => {
        return queryInterface.bulkDelete("Users", {});
      })
      .then(() => {
        return queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
      });
  },
};
