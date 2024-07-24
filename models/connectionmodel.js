let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Connection = new Schema({
   requestedBy:{
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
},
  requestedTo:[{
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }],
  
  amount : {
    type:Number,
    required:true
  },
  status: {
    type: String,
    enum: ["active", "pending", "deactive"],
    default: "pending"
  },
  
 
 created_at:Date
},
{
    collection:"Connection"
})

module.exports = mongoose.model('Connection',Connection)