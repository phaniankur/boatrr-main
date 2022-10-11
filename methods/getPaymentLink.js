const sdk = require('api')('@cashfreedocs-new/v2#5qon17l8k4gqrl');
const dotenv = require('dotenv');
dotenv.config();
const baseAPI = require('../config/baseAPI');


async function getPaymentLink(req, res, next){

sdk.server('https://api.cashfree.com/pg');
const strikeBody = req.body.bybrisk_session_variables;
    const userResp = req.body.user_session_variables;
    const dbRes = req.body.user_session_variables.rideDetails;

const paymentData = await sdk.CreatePaymentLink({
  customer_details: {
    customer_phone: strikeBody.phone,
    customer_name: strikeBody.username,
  },
  link_notify: {send_sms: true},
  link_notes: {conversationID: req.params.id}, //conversation ID
  link_meta: {
    notify_url: `${baseAPI}paymentcallback`,
    // notify_url: 'https://eomcacxk3ha6f6e.m.pipedream.net/',
    upi_intent: true
  },
  link_id: req.params.id, //conversation ID
  link_amount: 1,
//   link_amount: dbRes.bookingPrice,
  link_currency: 'INR',
  link_purpose: 'Payment for Boaters'
}, {
  'x-client-id': process.env.PAYMENT_ID,
  'x-client-secret': process.env.PAYMENT_SECRET,
  'x-api-version': '2022-01-01'
})
// userResp.paymentLink = paymentData.link_url;
return paymentData.link_url
}
module.exports = getPaymentLink;