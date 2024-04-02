const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const PaymentSchema = new Schema({
    orderId: {type:String},
    deliveryMethod:{type:Object },
    methodPayment:{type:String},
    dataCustomer:{type:Object},
    dataProduct:{type:Object},
    infoPayment:{type:Object},
    },{timestamps:true, collection:'payment'},
);

mongoose.plugin(slug);

module.exports = mongoose.model('PaymentSchema', PaymentSchema);
