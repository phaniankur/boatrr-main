const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    riderPhone: {type: Number, required: false},
    bookingName: {type: String, required: false},
    riderEmail: {type: String, lowercase: true, required: false},
    userId: {type: String, required: false},
    businessId: {type: String, required: false},
    username: {type: String, required: false},
    rideDetails:{
        bookingPrice: {type: Number, required: false},
        discountCode: {type: String, required: false},  
        rideDate: { type: String, required: false },
        rideTime: {type: String, required: false},
        noofRiders: {type: String, required: false},
        pickupGhat: {type: String, required: false},
        typeofBoat: {type: String, required: false},
        rideRoute: {type: String, required: false},
    },
    orderDetails:{
        bookingStatus: {type: String, required: false},
        txnId: {type: String, required: false},
        paymentStatus: {type: String, required: false},
        bookingPrice: {type: Number, required: false},
        orderID: {type: String, required: false},
        paymentMethod: {type: String, required: false},
    },

    feedback: {
        rating: {type: Number, required: false},
        feedbackMsg: {type: String, required: false}
    }
},
{timeStamp: true}
); 
module.exports = mongoose.model("booking", bookingSchema)