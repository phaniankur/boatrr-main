const express = require('express');
const router = express.Router();

const getUserData = require('../../middlewares/getUserData.js');
const emailMethod = require('../../methods/emailMethod.js');
const cancelBookingMethod = require('../../methods/cancelBookingMethod.js');

router.post('/:id', getUserData, async(req,res) => {
try{
    // console.log('Email', req.body)
    const strikeBody = req.body.bybrisk_session_variables;
    const userResp = req.body.user_session_variables;
    const dbRes = req.body.user_session_variables.rideDetails;

    let strikeObj;
    if(userResp.confirmBooking[0] === 'Proceed to Payment'){
        // do something
        strikeObj = await emailMethod(req);
    } else if(userResp.confirmBooking[0] === 'Cancel'){
        strikeObj = await cancelBookingMethod(req);
    }
    res.status(200).json(strikeObj.Data());
} catch(err){
    console.log(err)
}
    
});

module.exports = router;