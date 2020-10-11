require('dotenv').config()
require('./connection/db');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_PORT = process.env.PORT || 5000;

const scrapping = require('./routes');

app.use('/api', scrapping);

app.use('/', (req, res) => {
  res.send('running from server');
});
const server = app.listen(API_PORT);

