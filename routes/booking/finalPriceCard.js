const express = require('express');
const router = express.Router();

const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData.js');

const finalPrice = require('../../methods/finalPrice');
const { validDiscounts } = require('../../config/data.js');

const invalidDiscount = require('../../methods/invalidDiscount');

router.post('/:id', getUserData,  async(req,res) => {

    try{
        const strikeBody = req.body.bybrisk_session_variables;
        const userResp = req.body.user_session_variables;
        const dbRes = req.body.user_session_variables.rideDetails;

        let strikeObj;

        console.log("check dsic",dbRes )
    
        if(userResp.discount){
            const discountValid = await validDiscounts.find(item => item.code === userResp.discount.toLowerCase())
            if(discountValid){
                // userResp.basePrice[0] = userResp.basePrice[0].replace('₹', '')
                dbRes.bookingPrice = dbRes.bookingPrice - discountValid.discountPrice
                strikeObj = finalPrice(req);
            } else{
                console.log('invalid code')
                strikeObj = invalidDiscount(req);
            }
    
            await booking.findByIdAndUpdate(req.params.id,{
                riderPhone: strikeBody.phone,
                rideDetails:{
                    rideTime: dbRes.rideTime,
                    rideDate: dbRes.rideDate,
                    rideRoute: dbRes.rideRoute,
                    discountCode: userResp.discount || '',
                    bookingPrice: dbRes.bookingPrice || '',
                    bookingStatus: 'pending'
                },
            }).then(console.log('saved')).catch(err=> console.log(err))
        }
        res.status(200).json(strikeObj.Data());
    }catch(err){
        console.log(err)
    }

});

module.exports = router;