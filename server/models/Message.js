const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  guests: Number,
  name: String,
  guestMessage: String,
  hostResponse: String,
  response: Boolean,
  checkIn: Date,
  checkOut: Date,
  dateSent: Date,
  _listing: { type: Schema.Types.ObjectId, ref: 'listing' },
  _guestUser: { type: Schema.Types.ObjectId, ref: 'user' },
  _hostUser: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('messages', messageSchema);
