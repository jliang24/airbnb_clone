const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
require('./models/Listing');
require('./routes/authRoutes')(app);
require('./routes/uploadRoutes')(app);
require('./routes/listingRoutes')(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });
}

server.listen(port);
console.log('Server listening on:', port);
