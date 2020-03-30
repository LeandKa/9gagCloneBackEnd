const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({

    points:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    post:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'Post'
    },
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }



})


module.exports = mongoose.model('Comment',CommentSchema);