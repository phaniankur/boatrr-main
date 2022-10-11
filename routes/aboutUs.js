const express = require('express');
const Create = require('../interfaces/strike');
const router = express.Router();

router.post('/about', async (req,res) => {
    try{
        const strikeObj = new Create('about us', '');
        let link = ''

        haveDiscObj = strikeObj.Question('about');
        haveDiscObj.QuestionText().
            SetTextToQuestion("About Us 👇");
    
        getDiscAns = haveDiscObj.Answer(true);
        getDiscAns.AnswerCardArray(strikeObj.VERTICAL_ORIENTATION);
    
        getDiscAns = getDiscAns.AnswerCard().
            SetHeaderToAnswer(10, strikeObj.WRAP_WIDTH).
            AddTextRowToAnswer(strikeObj.H4, `Boatrr is a start-up situated in Varanasi which aims to provide a seamless boat-ride experience to tourists and travelers accross the globe.`, "#1746A2", true);
        getDiscAns = getDiscAns.AnswerCard().
            SetHeaderToAnswer(1, strikeObj.WRAP_WIDTH).
            AddTextRowToAnswer(strikeObj.H5, `Read More: https://www.pmindia.gov.in/wp-content/uploads/2022/12/Modi-Ji-Photo-02-e1647325936821.jpg`, "#FF731D", true);
            
    res.status(200).json(strikeObj.Data());
    } catch(err){
        console.log(err)
    }
});
module.exports = router;