const baseAPI = require("../config/baseAPI");
const Create = require("../interfaces/strike");

async function PaymentInterfaceMethod(req, paymentLink){

    strikeObj = new Create('getting_started', `${baseAPI}confirmBooking/${req.params.id}?paymentLink=${paymentLink}`);

    quesObj = strikeObj.Question('paymentLink');
    quesObj.
        QuestionText().
            SetTextToQuestion(`Please Pay and click 'Confirm'!`)
    
    quesObj.Answer(false).AnswerCardArray(strikeObj.VERTICAL_ORIENTATION)
    .AnswerCard().SetHeaderToAnswer(2,strikeObj.FULL_WIDTH).AddTextRowToAnswer(strikeObj.H4, paymentLink ,"#FF731D",true)

    quesObj = quesObj.AnswerCard().
            SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).
            AddTextRowToAnswer(strikeObj.H5, 'Confirm your Payment', "#1746A2", true);
    
    return strikeObj
}
module.exports = PaymentInterfaceMethod