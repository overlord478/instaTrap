const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
    try{
    await mongoose.connect(config.get('mongoURI'),{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })

    console.log("Connected to DB");
}
    catch(err) {
        console.log(err)
    }
}

module.exports = connectDB;