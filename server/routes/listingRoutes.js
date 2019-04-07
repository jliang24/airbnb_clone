const listings = mongoose.model('listing');

module.exports = app => {
  app.post('/api/listings', (req, res) => {
    console.log(req.body);
  });
};
