const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailSchema = new Schema({
  baths: Number,
  bedrooms: Number,
  beds: Number,
  guests: Number,
  customAmenityObj: []
});

module.exports = detailSchema;
