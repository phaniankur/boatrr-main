const express = require('express'), bodyParser = require('body-parser');
const app = express();

const dateCard = require('./routes/booking/dateCard');
const timeCard = require('./routes/booking/timeCard');
const priceCard = require('./routes/booking/priceCard');
const haveDiscount = require('./routes/booking/haveDiscount');
const discountCard = require('./routes/booking/discountCard');
const invalidDiscountCard = require('./routes/booking/invalidDiscountCard');
const finalPriceCard = require('./routes/booking/finalPriceCard');
const emailCard = require('./routes/booking/emailCard');
const payment = require('./routes/booking/payment');
const confirmBooking = require('./routes/booking/confirmBooking');
const getAllBookingStatus = require('./routes/getAllBookingStatus');
const previousOrders = require('./routes/previousOrders');
const paymentCallBack = require('./routes/paymentCallback');
const about = require('./routes/aboutUs');

app.use(bodyParser.json());

// app.use(getUserData);

app.use('/', getAllBookingStatus, previousOrders, paymentCallBack, about);
app.use('/datecard',dateCard);
app.use('/timecard',timeCard);
app.use('/pricecard',priceCard);
app.use('/havediscount',haveDiscount);
app.use('/discountcard', discountCard);
app.use('/invaliddiscountcard',invalidDiscountCard);
app.use('/finalprice',finalPriceCard);
app.use('/emailcard', emailCard);
app.use('/payment', payment);
app.use('/confirmBooking', confirmBooking);

module.exports = app;