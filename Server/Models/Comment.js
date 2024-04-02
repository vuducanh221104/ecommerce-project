const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


const ListComment = new Schema({
  fullname: {type:String},
  comment: {type:String},
  stars:{type:Number},
  createdAt: { type: Date, default: Date.now },
}, { _id: false });



const CommentSchema = new Schema({
    slug: {type:String},
    content: [ListComment],
})



module.exports = mongoose.model('product-comments',CommentSchema);


 

 