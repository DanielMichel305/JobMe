const mongoose = require('mongoose');

const Order = require('./orderModel').orderSchema;

const gigSchema = new mongoose.Schema({
    gigID: {
        type: String,
        required: true,
        unique: true
    },
    gigDescription: {
        type: String,
        required: true,
        maxlength: 150
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    media_paths: {
        type: [String],
        unique: true
    },
    date_posted: {
        type: String,
        required: true
    }/* ,
    orders: [Order] */
}, {
    versionKey: false,
    strict: true
});

const Gig = mongoose.model('Gigs', gigSchema);

module.exports = [Gig,gigSchema];