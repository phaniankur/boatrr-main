const express = require('express');
const emailNotification = require('../methods/emailNotification');
const pushNotification = require('../methods/pushNotification');
const router = express.Router();
const booking = require("../models/booking");

//template
router.post('/paymentcallback', (req,res) => {
  try{
    if(req.body.type === 'PAYMENT_LINK_EVENT'){

      let paymentStatus = req.body.data.order.transaction_status;
      let conversationID = req.body.data.link_notes.conversationID;
      let transactionID = req.body.data.order.transaction_id;
      let paidAmount = req.body.data.order.order_amount;
      let orderID = req.body.data.order.order_id;
      let customerName = req.body.data.customer_details.customer_name;
      // console.log('Payment CALLBACK' ,paymentStatus, conversationID)
      // return transaction_status
      booking.findOneAndUpdate({_id: conversationID},
        {
          $set : {
            orderDetails:{
              bookingStatus: 'booked',
              txnId: transactionID,
              paymentStatus: paymentStatus,
              bookingPrice: paidAmount,
              orderID: orderID,
              paymentMethod: req.body.data.link_meta.payment_methods
            }            
          }
        },
        {
          upsert: true,
          new: true
        },
        async(err, data) => {
          if (err) {
              console.log("Something wrong when updating data!");
          }     
          console.log(data);
          await emailNotification(data);
          await pushNotification(data);
      },        
      ).catch(err=> console.log(err))
    }
    console.log("payment middleware")

  }catch(err){
    console.log(err)
  }
});

  module.exports = router;