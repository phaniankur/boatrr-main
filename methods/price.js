const baseAPI = require("../config/baseAPI");
const { priceCard } = require("../config/data");
const Create = require("../interfaces/strike");

function price(req){

    const userResp = req.body.user_session_variables;

    let strikeObj;
    if(userResp.rideRoute !== undefined){
       userResp.rideRoute[0].toLowerCase() === 'ganga aarti boat-ride' ?
    strikeObj = new Create('getting_started',`${baseAPI}discountcard/${req.params.id}`):
    strikeObj = new Create('getting_started', `${baseAPI}timecard/${req.params.id}`); 
    } else{
        strikeObj = new Create('getting_started', `${baseAPI}timecard/${req.params.id}`);
    }
    
    // Question interface 5
    //defining question obj
    questionNumberObj = strikeObj.Question('basePrice');
    questionNumberObj.QuestionText().
        SetTextToQuestion("Please select your ride");
    
    // Answer interface 5
    // defining an answer obj for the above  question
    timeSlotAnswerObj = questionNumberObj.Answer(true);
    timeSlotAnswerObj.AnswerCardArray(strikeObj.VERTICAL_ORIENTATION);
    for(let i=0;i<priceCard.length;i++) {
        // apennding answers for the above answer obj
        timeSlotAnswerObj.AnswerCard().
        SetHeaderToAnswer(1,strikeObj.WRAP_WIDTH).
            AddTextRowToAnswer(strikeObj.H3, "₹" + priceCard[i].amount,"#1746A2",true).
            AddTextRowToAnswer(strikeObj.H4,"Boat Type: " + priceCard[i].boatType,"#FF731D",false).
            AddTextRowToAnswer(strikeObj.H4 ,"No of People: " + priceCard[i].riderRange,"#1746A2",true);
            // AddTextRowToAnswer(strikeObj.H5, "Pickup Station: " + priceCard[i].pickupGhat,"#687987",false)
	}
    timeSlotAnswerObj.AnswerCard().SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).AddTextRowToAnswer(strikeObj.H4, "↩️ Change Ride Date", "#009646", )

    return strikeObj;
}
module.exports = price;