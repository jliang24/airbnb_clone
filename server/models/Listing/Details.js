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
  includedDates: [Date],
  unavailableDates: [Date],
  customAmenityArr: [customAmenitySchema],
  maxNights: Number,
  startDate: Date
});

module.exports = detailSchema;
