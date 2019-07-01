const mongoose = require('mongoose');
const Listing = mongoose.model('listing');
const User = mongoose.model('listing');
const Messages = mongoose.model('messages');
const passport = require('passport');
const _ = require('lodash');

const requireSignin = passport.authenticate('jwt', { session: false });

module.exports = app => {
  const details = 'details.guests details.bedrooms details.beds details.baths';
  const location = 'location.title location.city location.state location.cost';
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const checkUser = async (listingId, userId) => {
    let isUser = false;
    // wait for listing to determine if userId in request is the same as user in listing
    await Listing.findOne({ _id: listingId })
      .populate('_user')
      .exec()
      .then(listing => {
        isUser = userId.toString() === listing._user._id.toString();
      });
    return isUser;
  };

  app.get('/api/listings', async (req, res) => {
    const { searchConfigs } = req.query;
    const { category, value } = JSON.parse(searchConfigs);
    const query = `location.${category}`;
    const queryObj = { [query]: value };

    const listing = await Listing.find({
      $and: [{ 'details.includedDates': { $gte: start } }, queryObj]
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
      _user: req.user._id,
      listingCreated: new Date()
    });

    await newListing.save();
    res.send(newListing);
  });

  app.delete('/api/listings/:id', requireSignin, async (req, res) => {
    const isUser = await checkUser(req.params.id, req.user._id);
    if (!isUser) {
      return res.send(401, 'unauthorized');
    }

    await Listing.deleteOne({ _id: req.params.id });
    await Messages.remove({ _listing: req.params.id });
    res.send('/');
  });

  app.patch('/api/listings/:id', requireSignin, async (req, res) => {
    const { details, listing, amenities, pictures } = req.body;
    const amenitiesArr = amenities ? _.keys(_.pickBy(amenities)) : null;
    const isUser = await checkUser(req.params.id, req.user._id);
    if (!isUser) {
      return res.send(401, 'unauthorized');
    }

    const listingFound = await Listing.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          details,
          location: listing,
          amenities: amenitiesArr,
          pictures
        }
      }
    ).exec();

    res.send(listingFound);
  });
};
