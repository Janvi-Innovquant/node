let mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/userdb",{useNewUrlParser:true})
        console.log(`DataBase is connected`)
    } catch (error) {
       console.log(`Database is not connected ${error}`)  
    }
}
module.exports = connectDB