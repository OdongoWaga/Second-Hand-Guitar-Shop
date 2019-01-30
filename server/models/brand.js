const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlenght: 100,
  },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };
