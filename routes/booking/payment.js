const express = require('express');
const router = express.Router();

const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData.js');
const emailMethod = require('../../methods/emailMethod.js');

const PaymentInterfaceMethod = require('../../methods/paymentMethod.js');
const validateEmail = require('../../methods/validateEmail.js');
const getPaymentLink = require('../../methods/getPaymentLink.js');

router.post('/:id', getUserData, async(req,res) => {
try{

  const strikeBody = req.body.bybrisk_session_variables;
  const userResp = req.body.user_session_variables;
  const dbRes = req.body.user_session_variables.rideDetails;

  let strikeObj;

  if(validateEmail(userResp.email)){

    await booking.findByIdAndUpdate(req.params.id,{
      riderPhone: strikeBody.phone,
      riderEmail: userResp.email,
      userId: strikeBody.userId,
      businessId: strikeBody.businessId,
      username: strikeBody.username,
      rideDetails:{
          rideTime: dbRes.rideTime,
          rideDate: dbRes.rideDate,
          rideRoute: dbRes.rideRoute,
          discountCode: dbRes.discountCode || '',
          pickupGhat: 'Kedar Ghat',
          txnId: '',
          paymentStatus: '',
          bookingPrice: '',
          orderID: '',
          paymentMethod: ''
          // bookingPrice: dbRes.bookingPrice,
      },
      orderDetails:{
        bookingStatus: dbRes.bookingStatus,
      }
  })
  .then((data)=> console.log("email saved"))
  .catch(err=> console.log(err))

    let paymentLink = await getPaymentLink(req)

    strikeObj = await PaymentInterfaceMethod(req, paymentLink)
  } else{
    strikeObj = await emailMethod(req);
    console.log("INvalid mail")
  }
  // strikeObj = await PaymentInterfaceMethod(req);

  res.status(200).json(strikeObj.Data());
} catch(err){
    console.log(err)
}
    
});

module.exports = router;