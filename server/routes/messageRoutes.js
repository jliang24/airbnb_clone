const passport = require('passport');

const requireSignin = passport.authenticate('jwt', { session: false });
const mongoose = require('mongoose');

const Message = mongoose.model('messages');
const Listing = mongoose.model('listing');

module.exports = app => {
  app.post('/api/messages', requireSignin, (req, res) => {
    const { message, startDate, endDate, guests, listingId } = req.body;
    Listing.findById(listingId)
      .select('_user')
      .exec(function(err, host) {
        const { _user } = host;
        const userMessage = new Message({
          guests,
          name: `${req.user.firstName} ${req.user.lastName}`,
          guestMessage: message,
          checkIn: startDate,
          checkOut: endDate,
          _guestUser: req.user._id,
          _listing: listingId,
          _hostUser: _user,
          dateSent: new Date()
        });

        userMessage.save();
        res.send(userMessage);
      });
  });

  app.get('/api/messages', requireSignin, (req, res) => {
    const userId = req.user._id;

    Message.find({
      $or: [{ _hostUser: userId }, { _guestUser: userId }]
    })
      .populate('_listing', 'location pictures')
      .then(message => {
        const modifiedMessage = message.map(messageInfo => {
          const listingTitle = messageInfo._listing.location.title;
          const picture = messageInfo._listing.pictures[0];
          const messageObject = messageInfo.toObject();
          messageObject.messageHost =
            messageInfo._hostUser.toString() === userId.toString()
              ? true
              : false;
          delete messageObject._listing;
          return { picture, listingTitle, ...messageObject };
        });
        res.send(modifiedMessage);
      });
  });
};
