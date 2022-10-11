const express = require('express');
const router = express.Router();

const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData.js');
const acceptDiscountMethod = require('../../methods/acceptDiscountMethod.js');
const price = require('../../methods/price.js');

router.post('/:id', getUserData, async(req,res) => {
try{
    const strikeBody = req.body.bybrisk_session_variables;
    const userResp = req.body.user_session_variables;
    const dbRes = req.body.user_session_variables.rideDetails;


    let rideTime;
    if(dbRes.rideRoute === 'Ganga Aarti Boat-Ride'){
        rideTime = '6:00 PM';
        // userResp.basePrice[0] = userResp.basePrice[0].replace('₹', '')
        bookingPrice = dbRes.bookingPrice;
    }
    else{
        rideTime = userResp.rideTime[0];
        bookingPrice = dbRes.bookingPrice;
    }
    // console.log("booking price", req.body)

    await booking.findByIdAndUpdate(req.params.id,{
        riderPhone: strikeBody.phone,
        rideDetails:{
            rideTime: rideTime,
            rideDate: dbRes.rideDate,
            rideRoute: dbRes.rideRoute,
            bookingPrice: bookingPrice,
            bookingStatus: dbRes.bookingStatus
        },
    }).catch(err=> console.log(err))

    let strikeObj;
    if(rideTime === '↩️ Go Back'){
        strikeObj = await price(req)
    } else{
        strikeObj = await acceptDiscountMethod(req);
    }
    res.status(200).json(strikeObj.Data());
} catch(err){
    console.log(err)
}
    
});

module.exports = router;