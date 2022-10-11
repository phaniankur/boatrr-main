function getOrderID(req,res,next) {

    var id = "BT" + Math.random().toString(36).slice(2)
    const userResp = req.body.user_session_variables;
    if(userResp){
        userResp.rideDetails.orderID =  id.toLocaleUpperCase();
        next();
    }
}
module.exports = getOrderID;