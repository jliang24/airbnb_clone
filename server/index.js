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
require('./models/Message');
require('./routes/authRoutes')(app);
require('./routes/uploadRoutes')(app);
require('./routes/listingRoutes')(app);
require('./routes/messageRoutes')(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

/* 
  The purpose of the statements below is to allow the backend and frontend to run on the same server. 
  Note - This is not something you would use in a real environment since sending static files can take up CPU usage. 
*/
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // If you don't find a defined route, then search for the file in client/build
  app.use(express.static(path.join(__dirname, '/../client/build')));

  // Send the html file from client side if the route is not known and the file is not in client/build.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });
}

server.listen(port);
console.log('Server listening on:', port);
