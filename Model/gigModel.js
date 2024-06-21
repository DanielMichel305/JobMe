const mongoose = require('mongoose');

const Order = require('./orderModel');
const User = require('./UserModel');

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
    imgs: [{
        data: Buffer
    }],
    date_posted: {
        type: String,
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Users',
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Orders',
    }]
}, {
    versionKey: false,
    strict: true
});

const Gig = mongoose.model('Gigs', gigSchema);

module.exports = [Gig,gigSchema];