'use strict';

const Sequelize = require('sequelize');

const options = {
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
  define: {
    // This option removes the `createdAt` and `updatedAt` columns from the tables
    // that Sequelize generates from our models. These columns are often useful
    // with production apps, so we'd typically leave them enabled, but for our
    // purposes let's keep things as simple as possible.
    timestamps: false,
  },
};