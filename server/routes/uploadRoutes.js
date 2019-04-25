const AWS = require('aws-sdk');
const passport = require('passport');
const uuid = require('uuid');
const keys = require('../config');

const requireSignin = passport.authenticate('jwt', { session: false });

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccesskey
});

module.exports = app => {
  app.get('/api/upload', requireSignin, (req, res) => {
    const key = `${req.user._id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'airbnb-clone-jeff',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        console.log({ key, url });
        res.send({ key, url });
      }
    );
  });
};
