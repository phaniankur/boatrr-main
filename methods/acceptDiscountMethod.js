const baseAPI = require("../config/baseAPI");
const Create = require("../interfaces/strike");

async function acceptDiscountMethod(req){

    const strikeObj = new Create('getting_started', `${baseAPI}havediscount/${req.params.id}`);

    haveDiscObj = strikeObj.Question('haveDisc');
    haveDiscObj.QuestionText().
        SetTextToQuestion("Do you have a Discount Code?");

    getDiscAns = haveDiscObj.Answer(true);
    getDiscAns.AnswerCardArray(strikeObj.VERTICAL_ORIENTATION);

    getDiscAns = getDiscAns.AnswerCard().
        SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).
        AddTextRowToAnswer(strikeObj.H5, 'YES', "#1746A2", true);

    getDiscAns = getDiscAns.AnswerCard().
        SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).
        AddTextRowToAnswer(strikeObj.H5, 'NO', "#FF731D", true);
    return strikeObj;
}
module.exports = acceptDiscountMethod