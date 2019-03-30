const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
require('./routes/authRoutes')(app);
require('./routes/uploadRoutes')(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
