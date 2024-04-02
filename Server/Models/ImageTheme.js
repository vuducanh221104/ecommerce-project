const { container } = require('googleapis/build/src/apis/container');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


const ProductBoxThemeSchema = new Schema({
    imageBox: { type: String },
    titleBox: { type: String },
    slugBox: { type: String, slug: 'titleBox'},
}, { _id: false });


const ImageThemeSchema = new Schema({
    image_home:{type:Array},
    image_customer:{type:Array},
    container:{
        type:Array,    
    },
}, {
    timestamps:true,
    collection :'images_home'
})

mongoose.plugin(slug);

module.exports = mongoose.model('ImageHomeSchema',ImageThemeSchema);


 

 