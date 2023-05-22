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
    }
},{ timestamps: true });

module.exports=mongoose.model('user',UserSchema);
