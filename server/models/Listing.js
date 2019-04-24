const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const detailSchema = require('./Listing/Details');
const locationSchema = require('./Listing/Location');

const listingSchema = new Schema({
  details: detailSchema,
  pictures: [String],
  amenities: [String],
  location: locationSchema,
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
  listingCreatedDate: Date
});

mongoose.model('listing', listingSchema);
