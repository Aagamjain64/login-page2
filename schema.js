const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Fixed Schema import
const passportLocalMongoose = require('passport-local-mongoose');
const newaccount= new Schema({
    //not need of this 
    // username:{
    //     type:String,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     required:true
    // }
})
newaccount.plugin(passportLocalMongoose);
// Automatically adds username, hash, salt means password
module.exports=mongoose.model("User",newaccount)