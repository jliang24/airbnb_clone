const mongoose = require('mongoose');
const Listing = mongoose.model('listing');
const passport = require('passport');
const _ = require('lodash');

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

  app.get('/api/listings/:id', async (req, res) => {
    const listing = await Listing.findOne({
      _id: req.params.id
    });

    res.send(listing);
  });

  app.post('/api/listings', requireSignin, async (req, res) => {
    const { details, listing, amenities, pictures } = req.body;
    const amenitiesArr = amenities ? _.keys(_.pickBy(amenities)) : null;
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
