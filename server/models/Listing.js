const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  details: [String],
  pictures: [String],
  amenities: [String],
  listingCreatedDate: Date
});

mongoose.model('listing', listingSchema);

// HOW TO STRUCTURE THE DATA

// customAmenities: [customAmenitySchema];

// customAmenitySchema = {
//   name: 'yolo',
//   url: 'blah'
// };
