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
  app.get('/api/upload/:type', requireSignin, (req, res) => {
    const type = req.params.type;
    const key = `${req.user._id}/${uuid()}.${type}`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'airbnb-clone-jeff',
        ContentType: `image/${type}`,
        Key: key
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });
};
