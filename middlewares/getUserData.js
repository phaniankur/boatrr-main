const booking = require('../models/booking');

function getUserData(req,res,next) {

    const userResp = req.body.user_session_variables;
    booking.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
            return
        }
        if(data.length === 0) {
            console.log("No record found")
            return
        }else{
            userResp.rideDetails = data.rideDetails || '';
            next();
        }
    })
    
}

module.exports = getUserData;