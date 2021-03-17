const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: String,
  origin: String,
  url: String,
  title: String,
  description: String,
  prices: [{
    type: String
  }],
  images: [{
    type: String
  }]
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel