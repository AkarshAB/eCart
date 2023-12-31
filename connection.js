//CONNECT NODE AND MONGODB
//1.imprort mongoose
const mongoose = require('mongoose');

//2. add connection from .env
const DB = process.env.DATABASE

//3. connection code 
mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then (() => {
  console.log('Database connection established');
}).catch((err) => {
  console.log(err);
})