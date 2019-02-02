const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const contact = require('./routes/contact.routes');
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let dev_db_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds119765.mlab.com:19765/smsmanager`;

mongoose.connect(dev_db_url);

mongoose.Promise = global.Promise;

let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MONGODB error connection'))

app.use('/contact', contact);

app.listen(port, () => {
  console.log(`Starting app on PORT ${port}`)
})