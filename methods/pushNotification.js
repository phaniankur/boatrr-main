// var express = require('express');
const axios = require('axios');
const moment = require('moment/moment');
const dotenv = require('dotenv')
dotenv.config();

async function pushNotification(data){

    function subtractHours(numOfHours, date = new Date()) {
        date.setHours(date.getHours() - numOfHours);
      
        return date;
    }

    var dt = moment(data.rideDetails.rideTime, ["h:mm A"]).format("HH:mm");

    const rideTime = new Date(`${data.rideDetails.rideDate.replace(/['"]+/g, '')} ${dt} GMT+0530`);

    let subtractedRideTime = subtractHours(1, rideTime)
    var convertedRideTime = moment(subtractedRideTime, ["h:mm A"]).utc().format("HH:mm");

    let convertedDate = moment(data.rideDetails.rideDate).format("YYYY-MM-DD");

    axios.post(`https://${process.env.LONDON_CONFIG}@london.bybrisk.com/notification/send/push`,{
        user_id: data.userId,
        app_id: data.businessId,
        push_notification:{
            "story": `Hi ${data.username} your ride is scheduled at ${data.rideDetails.rideTime}`,
            "pic_url":"https://www.cbc.ca/kids/images/weird_wonderful_bunnies_header_update_1140.jpg"
        },
        target_time:`${convertedRideTime}:00`,
        target_date: convertedDate
        ,
        // headers: { 'Content-Type': 'application/json' }
    }).then(res=> console.log('push scheduled',res.data))
    .catch(err=> console.log(err))
}
module.exports = pushNotification