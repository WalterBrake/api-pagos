'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.sequelize
      .query(`

          CREATE  PROCEDURE update_user(id INT, paymentDate datetime)

          BEGIN
            UPDATE Users
              set lastPayment= paymentDate
              WHERE userId= id;
          END
          `)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize
    .query(` DROP PROCEDURE IF EXISTS update_user;
        `)
  }
};
