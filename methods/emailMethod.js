const baseAPI = require("../config/baseAPI");
const Create = require("../interfaces/strike");

async function emailMethod(req){

    const strikeBody = req.body.bybrisk_session_variables;
    const userResp = req.body.user_session_variables;
    
    const strikeObj = new Create('getting_started', `${baseAPI}payment/${req.params.id}`);
    
    if(userResp.email){
        quesObj = strikeObj.Question('email');
        quesObj.QuestionCard().SetHeaderToQuestion(1,strikeObj.HALF_WIDTH).
        AddTextRowToQuestion(strikeObj.H4,"Invalid Email! Please re-type your email.");
    } else{
     quesObj = strikeObj.Question('email');
    quesObj.
        QuestionText().
            SetTextToQuestion(`Type your Email`)   
    }
    
    
    quesObj.TextInput();
    return strikeObj
}
module.exports = emailMethod