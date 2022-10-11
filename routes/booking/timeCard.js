const express = require('express');
const router = express.Router();

const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData');
const timeCardMethod = require('../../methods/timeCardMethod.js');
const dateCardMethod = require('../../methods/dateCardMethod.js');

router.post('/:id', getUserData, async(req,res) => {
    
    try{
        const strikeBody = req.body.bybrisk_session_variables;
        const userResp = req.body.user_session_variables;
        const dbRes = req.body.user_session_variables.rideDetails;
        // console.log('check price', userResp)

        let strikeObj;
        if(userResp.basePrice[0].toLowerCase() === '↩️ change ride date'){
            strikeObj = await dateCardMethod(req)
        } else{
            userResp.basePrice[0] = userResp.basePrice[0].replace('₹', '')
            await booking.findByIdAndUpdate(req.params.id,{
                riderPhone: strikeBody.phone,
                rideDetails:{
                    // rideTime: userResp.rideTime[0],
                    bookingPrice: userResp.basePrice[0],
                    rideDate: dbRes.rideDate,
                    rideRoute: dbRes.rideRoute,
                    bookingStatus: dbRes.bookingStatus
                },
            }).catch(err=> console.log(err))
            strikeObj = await timeCardMethod(req);
        }
        res.status(200).json(strikeObj.Data());
    } catch(err){
        console.log(err)
    } 

});

module.exports = router;