let User = require("../models/usermodel")

module.exports = {
    saveuser : async(req,res) => {
        try {
            let user = new User(req.body)
           let data =  await user.save();
           res.send({success:true,message:"User Saved Successfully",data})
        } catch (error) {
            res.send({success:false,message:"Something wrong",error})
        }
    }
}