const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlenght: 100,
    },
    description: {
      type: String,
      required: true,
      maxlenght: 10000,
    },
    price: {
      type: Number,
      required: true,
      maxlenght: 255,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    wood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wood',
      required: true,
    },
    frets: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      maxlenght: 100,
      default: 0,
    },
    publish: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
