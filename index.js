const express = require('express');
const db = require('./config/db');
const ovulationRouter = require('./router/user.router');
const bodyParser = require('body-parser');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to database
db();

// Serve static files
app.use(express.json());
app.use(express.static('public'));

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route requests to the ovulation router
//app.use('/ovulation', ovulationRouter);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.set({
    'Allow-access-Allow-Origin': '*',
  });
  return res.redirect('index.html');
});

app.use('/ovulation', ovulationRouter);

// Listen on port 9000
app.listen(9000, () => {
  console.log('Listening on port 9000');
});