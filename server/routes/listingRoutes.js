const mongoose = require('mongoose');
const Listing = mongoose.model('listing');
const passport = require('passport');

const requireSignin = passport.authenticate('jwt', { session: false });
module.exports = app => {
  app.get('/api/listings', async (req, res) => {
    const details =
      'details.guests details.bedrooms details.beds details.baths';
    const location =
      'location.title location.city location.state location.cost';
    const listing = await Listing.find().select(
      `${details} ${location} pictures`
    );
    res.send(listing);
  });

  app.post('/api/listings', requireSignin, async (req, res) => {
    const { details, listing, amenities, pictures } = req.body;
    console.log(listing);
    const amenitiesArr = amenities ? Object.keys(amenities) : null;
    console.log(req.user);
    const newListing = new Listing({
      details,
      location: listing,
      amenities: amenitiesArr,
      pictures,
      _user: req.user._id
    });
    await newListing.save();
    res.send(newListing);
  });
};
