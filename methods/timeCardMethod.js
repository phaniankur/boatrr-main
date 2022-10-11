const baseAPI = require("../config/baseAPI");
const { timeSlots } = require("../config/data");
const Create = require("../interfaces/strike");

async function timeCardMethod(req){
    const userResp = req.body.user_session_variables; 
    // console.log('timeCard', userResp)
    let strikeObj;
    
    strikeObj = new Create('getting_started',`${baseAPI}discountcard/${req.params.id}`)
    
    // Question interface 5
    //defining question obj
    questionNumberObj = strikeObj.Question('rideTime');
    questionNumberObj.QuestionText().
        SetTextToQuestion("Please select your preferred time");
    
    // Answer interface 5
    // defining an answer obj for the above  question
    timeSlotAnswerObj = questionNumberObj.Answer(true);
    timeSlotAnswerObj.AnswerCardArray(strikeObj.VERTICAL_ORIENTATION);
    for(let i=0;i<timeSlots.length;i++) {
        // apennding answers for the above answer obj
        timeSlotAnswerObj.AnswerCard().SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).AddTextRowToAnswer(strikeObj.H4, timeSlots[i], "#FF731D", true)
	}
    timeSlotAnswerObj.AnswerCard().SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).AddTextRowToAnswer(strikeObj.H4, "↩️ Go Back", "#009646", )
    return strikeObj;
}
module.exports = timeCardMethod