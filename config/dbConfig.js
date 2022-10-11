const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const dbConfig = async ()=>{
    try{
        const connectDb = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log(`Db Connected: ${connectDb.connection.host}`);
    }
    catch(err){
        console.log(`Db Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = dbConfig;