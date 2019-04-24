const mongoose = require('mongoose');
const Listing = mongoose.model('listing');
const passport = require('passport');

const requireSignin = passport.authenticate('jwt', { session: false });
module.exports = app => {
  app.post('/api/listings', requireSignin, (req, res) => {
    const { details, listing, amenities, pictures } = req.body;
    const amenitiesArr = Object.keys(amenities);
    console.log(req.user);
    const newListing = new Listing({
      details,
      listing,
      amenities: amenitiesArr,
      pictures,
      _user: req.user._id
    });
    newListing.save();
    // res.send('/');
  });
};
