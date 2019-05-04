const mongoose = require('mongoose');
const Listing = mongoose.model('listing');
const User = mongoose.model('listing');
const passport = require('passport');
const _ = require('lodash');

const requireSignin = passport.authenticate('jwt', { session: false });

module.exports = app => {
  const details = 'details.guests details.bedrooms details.beds details.baths';
  const location = 'location.title location.city location.state location.cost';
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  app.get('/api/listings', async (req, res) => {
    const listing = await Listing.find({
      'details.includedDates': { $gte: start }
    }).select(`${details} ${location} pictures`);

    res.send(listing);
  });

  app.get('/api/listings/user', requireSignin, async (req, res) => {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    const listing = await Listing.find({ _user: req.user._id }).select(
      `${details} ${location} pictures`
    );

    res.send(listing);
  });

  app.get('/api/listings/:id', async (req, res) => {
    await Listing.findOne({
      _id: req.params.id
    })
      .populate('_user')
      .exec(function(err, listing) {
        const { firstName, lastName } = listing._user;
        listing['_user'] = {
          firstName,
          lastName
        };

        res.send(listing);
      });
  });

  app.post('/api/listings', requireSignin, async (req, res) => {
    const { details, listing, amenities, pictures } = req.body;
    const amenitiesArr = amenities ? _.keys(_.pickBy(amenities)) : null;

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

  app.delete('/api/listings/:id', requireSignin, async (req, res) => {
    await Listing.findOne({ _id: req.params.id })
      .populate('_user')
      .exec(function(err, listing) {
        if (req.user._id.toString() !== listing._user._id.toString())
          return res.send('Failed');
      });
    await Listing.deleteOne({ _id: req.params.id });
    res.send('/');
  });
};
