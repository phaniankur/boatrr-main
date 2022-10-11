const baseAPI = require("../config/baseAPI");
const Create = require("../interfaces/strike");

async function invalidPaymentMethod(req, paymentLink){

    strikeObj = new Create('getting_started', `${baseAPI}confirmBooking/${req.params.id}?paymentLink=${req.query.paymentLink}`);

    quesObj = strikeObj.Question('paymentLink');
    quesObj.
        QuestionText().
            SetTextToQuestion(`Payment not confirmed. Click 'Confirm' once paid.`)
    
    quesObj.Answer(false).AnswerCardArray(strikeObj.VERTICAL_ORIENTATION)
    .AnswerCard().SetHeaderToAnswer(2,strikeObj.FULL_WIDTH).AddTextRowToAnswer(strikeObj.H4, req.query.paymentLink ,"#FF731D",true)

    quesObj = quesObj.AnswerCard().
            SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).
            AddTextRowToAnswer(strikeObj.H5, 'Confirm your Payment', "#1746A2", true);
    
    return strikeObj
}
module.exports = invalidPaymentMethod