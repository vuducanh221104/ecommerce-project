const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

// Main
const ImageCategory = new Schema({
  images_theme: {type:Array},
  slug: {type:String , slug: 'category_name'}
}, {
  timestamps: true,
  collection: 'image_category'
});


mongoose.plugin(slug);

module.exports = mongoose.model('ImageCategory', ImageCategory);
