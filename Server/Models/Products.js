const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Products = new Schema(
    {
        name: { type: String, maxLength: 255 },
        image: { type: String},
        price: { type: Number, maxLength: 255 },
        price_discount: { type: Number, maxLength: 255 },
        price_prepay: { type: Number, maxLength: 255 },
        percent_discount: { type: Number, maxLength: 255 },
        brand: { type: String, maxLength: 100 },
        type:{type:String},
        category: {
            type: Object,
            category_slug: { type: String, maxLength: 100 },
            category_item_slug: { type: String, maxLength: 100 }, 
            category_item_child_slug: { type: String, maxLength: 100},
        },
        rating: { type: Number },
        stored:{type:Number},
        slug: { type: String, slug: 'name', unique: true },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
    },
    {
        collection:'products'
    }
);

mongoose.plugin(slug);
Products.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

// // Custom query helper
// Products.query.sortable = function (req) {
//     if (req.query.hasOwnProperty('_sort')) {
//         const isCheckType = ['asc', 'desc'].includes(req.query.type);
//         return this.sort({
//             [req.query.column]: isCheckType ? req.query.type : 'desc',
//         });
//     }
// };

module.exports = mongoose.model('Products', Products);
