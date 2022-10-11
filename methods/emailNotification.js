// var express = require('express');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();

async function emailNotification(data){
    let body = {
        user_id: data.userId,
        bot_id: data.businessId,
        to: data.riderEmail,
        subject: 'Your ride is scheduled | Boatrr',
        body: `Hi ${data.username},<br>Thank you for riding with Boatrr.<br>Here is your booking details.<br>Ride Date: ${data.rideDetails.rideDate}<br>Ride Time: ${data.rideDetails.rideTime}<br>Number of people:<br>Pick Up Ghat: ${data.rideDetails.pickupGhat}<br>Paid Amount: ${data.orderDetails.bookingPrice}<br>Order ID: ${data.rideDetails.orderID}<br><br>For your queries, please contact +91 9566015464 <br><br>Regards,<br>Team Boatrr`
    }

    await axios.post('https://cuba.bybrisk.com/mail',body, 
    {auth: {
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD
    }})
    .then(res=> console.log('mail sent',res.data))
    .catch(err=> console.log(err))
}
module.exports = emailNotification