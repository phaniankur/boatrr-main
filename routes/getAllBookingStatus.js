const express = require('express');
const router = express.Router();
const booking = require("../models/booking");

//template
router.get('/getallbookingstatus', async(req,res) => {
  try{
    const allBookings = await booking.find().sort({_id: -1});
    
    let totalBookings = allBookings.length;
    let allDetails = {
      totalBookings,
      allBookings
    }
    res.status(200).json(allDetails)
  }catch(err){
    console.log(err)
  }
    
  });

router.get('/confirmedbookings', async(req,res) => {
  try{
    const allBookings = await booking.find({
      "rideDetails.bookingStatus": "booked"
    }).sort({_id: -1});

    let totalBookings = allBookings.length;
    let allDetails = {
      totalBookings,
      allBookings
    }
    res.status(200).json(allDetails)
  }catch(err){
    console.log(err)
  }
    
  });

  module.exports = router;