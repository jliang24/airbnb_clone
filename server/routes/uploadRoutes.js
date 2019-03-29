const AWS = require('aws-sdk');
const keys = require('../config');

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccesskey
});

module.exports = app => {
  app.get('/api/upload', (req, res) => {});
};
