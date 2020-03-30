const Post = require('../Models/post');
const Tags = require('../Models/tags');
const Comment = require('../Models/comments');
const User = require('../Models/user');



exports.getComment = (req,res,next)=>{
    
    Comment.find().populate('post').then(result =>{
        return res.status(200).json({
            message:'Save with sucess',
            comment:result
        })

    })
    .catch(erro =>{
        return res.status(500).json({
            message:'Not Ok'
        })
    })
}

exports.getPost = (req,res,next) =>{

    const page =  parseInt(req.params.page)
    const limit = 10


    Post.find().limit(limit).skip((limit * page)-limit).exec().then(result =>{
        return res.status(200).json({
            message:'Success',
            post:result,
            page:page,
            pageSize:limit
        })

    })
    .catch(erro =>{
        return res.status(500).json({
            message:'Not Ok'
        })
    })
}


exports.getTags = (req,res,next) =>{
    Tags.find().populate('post').then(result =>{
        return res.status(200).json({
            message:'Success',
            tags:result
        })

    })
    .catch(erro =>{
        return res.status(500).json({
            message:'Not Ok'
        })
    })
}

exports.getOne = (req,res,next) =>{

    const id = req.params.postId

    Post.findById(id).populate({
        path:'comment',
        populate:{
            path:'user',
            model:'User'
        }
    }).then(result =>{
      return res.status(200).json({
          message:'Success',
          post:result
      })
    })
    .catch(err =>{
      return res.status(404).json({
          message:'Not Found'
      })
    })
}



exports.getOneUser = (req,res,next) =>{

    const params = req.headers.token
    User.findOne({'AccessToken':params}).populate('post').then(result =>{
        return res.status(200).json({
            message:'Success',
            user:result
        })
      })
      .catch(err =>{
        return res.status(404).json({
            message:'Not Found'
        })
      })
}


exports.getTagPosts = (req,res,next) =>{
    const params = req.params.tagId
    Tags.findById(params).populate('post')
    .then(result =>{
       res.status(200).json({
           message:'Ok',
           posts:result
       })
    })
    .catch(err =>{
     res.status(404).json({
         message:'Error'
     })
    })
}
