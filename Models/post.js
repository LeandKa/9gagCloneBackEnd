const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PostSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    imgPath:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    commentTotal:{
      type:Number,
      require:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    tag:{
              type:Schema.Types.ObjectId,
              require:true,
              ref:'Tags'
        },
    comment:[
        {
                type:Schema.Types.ObjectId,
                require:false,
                ref:'Comment'
        }
    ],
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
})

PostSchema.pre('save', function(){
    const path = this.imgUrl;
    this.imgUrl = `${process.env.IMGURL}/img/${path}`

})

module.exports = mongoose.model('Post',PostSchema);