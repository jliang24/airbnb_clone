const mongoose = require('mongoose');
const { Schema } = mongoose;

const customAmenitySchema = new Schema({
  name: String,
  icon: String
});

const detailSchema = new Schema({
  baths: Number,
  bedrooms: Number,
  beds: Number,
  guests: Number,
  descriptionText: String,
  includedDates: String,
  unavailableDates: String,
  customAmenityArr: [customAmenitySchema]
});

module.exports = detailSchema;
