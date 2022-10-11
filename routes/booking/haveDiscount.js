const express = require('express');
const router = express.Router();

const getUserData = require('../../middlewares/getUserData.js');
const discount = require('../../methods/discount');
const finalprice = require('../../methods/finalPrice.js');

router.post('/:id', getUserData, async(req,res) => {

    try{
        const userResp = req.body.user_session_variables;

        let strikeObj;
        if(userResp.haveDisc[0] === 'YES'){
            strikeObj = await discount(req);
        } else if(userResp.haveDisc[0] === 'NO'){
            strikeObj = await finalprice(req)
        }
        res.status(200).json(strikeObj.Data());
    }catch(err){
        console.log(err)
    }
    
});

module.exports = router;