const mongoose = require('mongoose');

const Schema = mongoose.Schema

const tagSchema = new Schema ({

    name:{
        type:String,
        required:true
    },
    post:[{
            type:Schema.Types.ObjectId,
            require:false,
            ref:'Post'
        }
    ]
})


module.exports = mongoose.model('Tags',tagSchema);