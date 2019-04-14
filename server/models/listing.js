const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: String,
  details: Object,
  cost: Number,
  pictures: [String],
  amenities: [String],
  additionalDesc: String,
  startDate: Date,
  endDate: Date,
  listingCreatedDate: Date
});

mongoose.model('listing', listingSchema);