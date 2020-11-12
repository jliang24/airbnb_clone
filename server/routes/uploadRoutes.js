const AWS = require('aws-sdk');
const cloudinary = require('cloudinary');
const passport = require('passport');
const uuid = require('uuid');
const keys = require('../config/keys');

const requireSignin = passport.authenticate('jwt', { session: false });

cloudinary.config({ 
  cloud_name: 'airbnbclone', 
  api_key: keys.cloudAPIKey, 
  api_secret: keys.cloudSecret 
});


module.exports = app => {
  app.post('/api/upload/:type', requireSignin, (req, res) => {
    console.log('hi')
    const type = req.params.type;
    const key = `${req.user._id}/${uuid()}.${type}`;
    const data = req.body.pictures;


    cloudinary.v2.uploader.upload(data, function(error, result) { 
      console.log(error)
      res.send({ url: result.secure_url}) 
    })


  });
};

