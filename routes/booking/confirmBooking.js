const express = require('express');
const router = express.Router();

const confirmBookingMethod = require('../../methods/confirmBookingMethod.js');
const emailNotification = require('../../methods/emailNotification.js');
const invalidPaymentMethod = require('../../methods/invalidPaymentMethod.js');
const pushNotification = require('../../methods/pushNotification.js');
const booking = require('../../models/booking.js');

router.post('/:id', async(req,res) => {

    try{
        let strikeObj;
        const paymentConfirm = await booking.findById(req.params.id)
    
        if(paymentConfirm.orderDetails.paymentStatus === 'SUCCESS'){

            strikeObj = await confirmBookingMethod(req, paymentConfirm);
        } else{
            strikeObj = await invalidPaymentMethod(req);
        }

    res.status(200).json(strikeObj.Data());
    } catch(err){
        console.log(err)
    }
});

module.exports = router;