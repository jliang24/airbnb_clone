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

// const s3 = new AWS.S3({
//   accessKeyId: keys.awsAccessKeyId,
//   secretAccessKey: keys.awsSecretAccesskey
// });

module.exports = app => {
  app.post('/api/upload/:type', requireSignin, (req, res) => {
    console.log('hi')
    const type = req.params.type;
    const key = `${req.user._id}/${uuid()}.${type}`;
    const data = req.body.pictures;


    cloudinary.v2.uploader.upload(data, function(error, result) { res.send({ url: result.secure_url}) })

    // s3.getSignedUrl(
    //   'putObject',
    //   {
    //     Bucket: 'airbnb-clone-jeff',
    //     ContentType: `image/${type}`,
    //     Key: key
    //   },
    //   (err, url) => {
    //     res.send({ key, url });
    //   }
    // );
  });
};

