const individualLandlordRoutes = require('./individualLandlordRoutes');

const mountRoutes = (app) => {
  app.use('/api/landlords/individual', individualLandlordRoutes);
};

module.exports = mountRoutes;
