const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const StorageOption = new Schema({
    link: { type: String },
    name: { type: String },
    price: { type: Number },
}, { _id: false });


const colorStockSchema = new mongoose.Schema({
    color: { type: String },
    image: { type: String },
    price: { type: Number },
    stored: { type: Number },
  },{_id:false});
  
  
const ProductsDetails = new Schema(
    {
        name: { type: String, maxLength: 255 },
        images: { type: Array },
        price: { type: Number, maxLength: 255 },
        price_prepay: { type: Number, maxLength: 255 },
        color: {type:Array},
        storage: { type: [StorageOption] },
        description: { type: String },
        infomation: { type: String },
        introduce: { type: String },
        subcategory_slug: { type: String},
        amount: { type: Number },
        slug: { type: String, slug: 'name'},
    },
    {collection:'product-details'},
);

mongoose.plugin(slug);

module.exports = mongoose.model('ProductsDetails', ProductsDetails);
