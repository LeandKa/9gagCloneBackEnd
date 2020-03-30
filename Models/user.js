const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    AccessToken:{
        type:String,
        required:false
    },
    RefreshToken:{
        type:String,
        required:false
    },
    post:[{
                type:Schema.Types.ObjectId,
                require:false,
                ref:'Post'
            }
    ],
    comments:[{
                type:Schema.Types.ObjectId,
                require:false,
                ref:'Comment'
            }]
})


module.exports = mongoose.model('User',userSchema);