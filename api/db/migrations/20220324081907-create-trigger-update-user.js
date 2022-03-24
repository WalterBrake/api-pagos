"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`

          CREATE TRIGGER last_payment
          AFTER INSERT
          ON Payments FOR EACH ROW
          BEGIN
              CALL update_user (
                  NEW.userId, 
                  NEW.createdAt
              );
          END
          `);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query(` DROP TRIGGER  IF EXISTS last_payment;
        `);
  },
};
