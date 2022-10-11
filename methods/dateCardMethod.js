const baseAPI = require("../config/baseAPI");
const { orange } = require("../config/constants");
const { rideCards } = require("../config/data");
const Create = require("../interfaces/strike");
const booking = require("../models/booking");

async function dateCardMethod(req){

    const strikeBody = req.body.bybrisk_session_variables;

    const newBooking = await new booking({
        riderPhone: strikeBody.phone,
    })
    newBooking.save();

    const strikeObj = new Create('getting_started', `${baseAPI}pricecard/${newBooking._id}`);

    // Question date
    rideDateObj = strikeObj.Question('dateOfRide');

    // Answer date
    rideDateObj.QuestionText().
        SetTextToQuestion("👇Select your ride date");
    rideDateObj.DateInput('Select Date');
    
    // Question interface 2
    //defining question obj
    questionNumberObj = strikeObj.Question('rideRoute');
    questionNumberObj.QuestionText().
        SetTextToQuestion("👇Select your ride type");
    
    // Answer interface 2
    // defining an answer obj for the above  question
    timeSlotAnswerObj = questionNumberObj.Answer(true);
    timeSlotAnswerObj.AnswerCardArray(strikeObj.VERTICAL_ORIENTATION);

    timeSlotAnswerObj = timeSlotAnswerObj.AnswerCard().
    SetHeaderToAnswer(10,strikeObj.FULL_WIDTH).
    AddTextRowToAnswer("👇Select your Route");
    for(let i=0;i<rideCards.length;i++) {

        timeSlotAnswerObj = timeSlotAnswerObj.AnswerCard().
            SetHeaderToAnswer(2,strikeObj.FULL_WIDTH).
            AddGraphicRowToAnswer(strikeObj.PICTURE_ROW,[rideCards[i].imgLink], ['']).
            AddTextRowToAnswer(strikeObj.H3, rideCards[i].rideName,"Black",true).
            AddTextRowToAnswer(strikeObj.H4,rideCards[i].desc,"#E14D2A",false).
            AddTextRowToAnswer(strikeObj.H4, 'Starting Price: '+rideCards[i].estimatedAmount,"#Black",true).
            AddTextRowToAnswer(strikeObj.H4, "Ride Time: " + rideCards[i].rideTime, orange , true).
            AddTextRowToAnswer(strikeObj.H4 ,"Routes Covered: " + rideCards[i].route,"Black",false).
            AddTextRowToAnswer(strikeObj.H5, "Pickup Station: " + rideCards[i].pickupGhat,"#687987",false)
	}
    return strikeObj
}
module.exports = dateCardMethod