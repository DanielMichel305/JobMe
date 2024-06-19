const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    clientID: {
        type: String,
        required: true
    },
    gigID: {
        type: String,
        required: true
    },
    freelancerID: {
        type: String,
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