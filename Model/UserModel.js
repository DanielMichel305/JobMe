const mongoose = require('mongoose');

const Order = require('./orderModel');
const Gig = require('./gigModel');

const UserSchema = new mongoose.Schema({

    userID: {
        type: Number,
        required: false,
        unique: false       ///change back to true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    auth_Method:    {           ///Bool for Now To indicate that true is internal(using password) or false (using google auth)
        type: Boolean,
        default: true,
        required: true
    },
    password: {
        type: String,
        required: function(){
            return this.auth_Method;
        }
    },
    phoneNumber: {
        type: String,
        required: false
    },
    gender: {
        type: Boolean,
        required: false
    },
    category: {
        type: Boolean,
        required: true,
        default: false
    },
    activated: {
        type: Boolean,
        default: false
    },

    createdAt: { 
        type: Date,
         default: Date.now 
    },

    orders: [{type: mongoose.Schema.Types.ObjectID, ref: 'Orders'}],
    gigs: [{type: mongoose.Schema.Types.ObjectID, ref: 'Gigs'}]
},{
    versionKey: false,
    strict: true
},{timestamps: false});

const User = mongoose.model('Users', UserSchema);

module.exports = User;