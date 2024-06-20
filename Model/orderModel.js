const mongoose = require('mongoose');

const User = require('./UserModel').UserSchema;

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Users',
        required: true
    },
    gig: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Gigs',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Users',
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    strict: true
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = [Order,orderSchema];