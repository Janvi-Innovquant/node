let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
   name:{
    type : String,
    require:true
},
  email:{
    type:String,
    require:true
  },
  
 created_at:Date
},
{
    collection:"User"
})

module.exports = mongoose.model('User',User)