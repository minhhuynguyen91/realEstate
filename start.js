const config = require('./config/web/server');
const mongoose = require('mongoose');


mongoose.connect(config.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${config.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


require('./models/product');
require('./models/user');


const app = require('./app');

const server = app.listen(config.PORT || 3000, () => {
  console.log("Server is running");
});