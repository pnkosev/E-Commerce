const authRoutes = require('../routes/auth');
const itemRoutes = require('../routes/item');

module.exports = (app) => {
  app.use('/user', authRoutes);
  app.use('/item', itemRoutes);
}
