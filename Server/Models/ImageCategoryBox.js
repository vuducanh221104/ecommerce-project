const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const SubProductSchema = new Schema(
    {
        box_product_name: { type: String },
        box_product_image: { type: String },
        box_product_slug: { type: String },
    },
    { _id: false },
);

const ImageCategoryBox = new Schema(
    {
        // product:{type:String},
        box_product: [SubProductSchema],
        category_name: { type: String },
        category_image: { type: String },
        category_slug: { type: String },
        category_parent_slug: { type: String },
    },
    {
        timestamps: true,
        collection: 'image_box-theme',
    },
);

// Sử dụng pre-save middleware để sinh slug nếu không có giá trị
ImageCategoryBox.pre('save', function (next) {
    if (!this.box_theme_slug) {
        this.box_theme_slug = this.box_theme_name ? this.box_theme_name : '';
    }
    next();
});

ImageCategoryBox.pre('save', function (next) {
    if (!this.series_slug) {
        // Sử dụng thư viện slug để sinh slug từ box_theme_name
        this.series_slug = this.series_slug ? this.series_slug : '';
    }
    next();
});

mongoose.plugin(slug);

module.exports = mongoose.model('ImageCategoryBox', ImageCategoryBox);
