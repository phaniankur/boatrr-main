const baseAPI = require("../config/baseAPI");
const { priceCard } = require("../config/data");
const Create = require("../interfaces/strike");

function discount(req){

    const strikeObj = new Create('getting_started', `${baseAPI}finalprice/${req.params.id}`);

    rideDiscountObj = strikeObj.Question('discount');
    rideDiscountObj.QuestionText().
        SetTextToQuestion("👇 Please type your code");

        rideDiscountObj.TextInput();
    return strikeObj;
}
module.exports = discount;