const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  guestMessage: String,
  hostResponse: String,
  response: Boolean,
  _listing: { type: Schema.Types.ObjectId, ref: 'listing' },
  _guestUser: { type: Schema.Types.ObjectId, ref: 'user' },
  _hostUser: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('messages', messageSchema);
