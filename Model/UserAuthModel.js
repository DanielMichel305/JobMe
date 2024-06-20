const mongoose = require('mongoose');


const UserAuth = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    Activation_TOKEN: {
        type: String,
        unique: true,
        required: true

    },
    createdAt: { 
        type: Date,
         default: Date.now 
    }

});

UserAuth.index({ createdAt: 1 }, { expireAfterSeconds: 900 });


// Create the model
const User = mongoose.model('Item', UserAuth);

module.exports = User