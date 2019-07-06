const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  address: String,
  city: String,
  cost: Number,
  state: String,
  title: String,
  zip: String,
  apt: String
});

module.exports = locationSchema;
