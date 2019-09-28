'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize ({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
  logging: false,
});

(async () => {
  try {
	  // Test the connection to the database
	  await sequelize.authenticate();
	  console.log('Nailed it! The database is connected.');
  } catch(error) {
	  	console.error('Database connection error: ', error);
  }	
})();

const models = {};

module.exports = {
  sequelize,
  Sequelize,
  models,
};
