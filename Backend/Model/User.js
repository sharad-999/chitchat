const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        length:{min:8},
        require:true
    },
    limit:{
        type:Number,
        default:5
    }
},{ timestamps: true });

module.exports=mongoose.model('user',UserSchema);
