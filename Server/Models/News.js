const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


const ListComment = new Schema({
  fullname: {type:String},
  comment_content: {type:String},
  createdAt: { type: Date, default: Date.now },
}, { _id: false });


const NewsSchema = new Schema({
    cover_image:{type:String},
    title: {type:String},
    tags: {type:String},
    content: {type:String},
    description: {type:String},
    author: {type:String},
    comment: [ListComment],
    slug: {type:String , slug: 'title' ,unique: true}
}, {
  timestamps: true,
  collection: 'news'
});


mongoose.plugin(slug);

module.exports = mongoose.model('NewsSchema', NewsSchema);
