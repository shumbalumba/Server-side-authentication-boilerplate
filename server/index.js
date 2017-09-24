//Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);

//Server Setup
const port =process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening: ', port);
