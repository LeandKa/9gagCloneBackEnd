const Post = require('../Models/post');
const Tags = require('../Models/tags');
const Comment = require('../Models/comments');
const User = require('../Models/user');
const file = require('../Util/file');

//Post Request

exports.postPost = (req,res,next)=>{

    const image = req.file

    const post = {
        title:req.body.title,
        imgPath:image.path,
        imgUrl:image.filename,
        points:req.body.points,
        userId:req.body.userId,
        commentTotal:req.body.commentTotal,
        comment:req.body.commentsId,
        tag:req.body.tag
    }
    const postModel = new Post(post);

    postModel.save()
    .then(result =>{
    
    Tags.findByIdAndUpdate(req.body.tag,{$push:{post:result._id}})
    .then(resultTags =>{
        User.findByIdAndUpdate(req.body.userId,{$push:{post:result._id}})
        .then(resultPost =>{
           return res.status(200).json({
               message:'Ok Save',
               object:result
           })
          })
    }) 
})
 .catch(err=>{
     return res.status(500).json({
         message:'Not Ok'
     })
 })
}

exports.postTags = (req,res,next) =>{
    const tags = {
        name:req.body.name
    }

    const tagsModel = new Tags(tags);

    tagsModel.save()
   .then(result =>{
    return res.status(200).json({
        message:'Save with sucess',
        tags:result
    })
})
.catch(err=>{
    return res.status(500).json({
        message:'Not Ok'
    })
})

}

exports.postComment = (req,res,next) =>{

    const commment = {
        points:req.body.points,
        date:Date.now(),
        post:req.body.post,
        text:req.body.text,
        user:req.body.userId
    }

    const comment =  new Comment(commment);

    Post.findById(req.body.post)
    .then(resultCommentPoints =>{
      const points = resultCommentPoints.commentTotal + 1
      comment.save()
    .then(result =>{
        Post.findByIdAndUpdate(req.body.post,{$set:{commentTotal:points},$push:{comment:result._id}})
        .then(resultPost =>{
            User.findByIdAndUpdate(req.body.userId,{$push:{comments:result._id}})
            .then(resultPost =>{
               return res.status(200).json({
                   message:'Ok Save',
                   object:result
               })
              })
        })
    })
    })
    .catch(erro =>{
        return res.status(500).json({
            message:'Not Ok'
        })
    })
   

    
}

//Delete Requests

exports.deletePost = (req,res,next) =>{

       Post.findById(req.params.id)
       .then(result =>{

        file.deleteFile(result.imgPath)

                result.comment.forEach( item => {
                    Comment.findByIdAndRemove(item)
                    .then(result=>{
                        next();
                    })
                });

        Tags.findByIdAndUpdate(result.tag,{$pull:{post:result._id}})
        .then(tagResult =>{
            User.findByIdAndUpdate(result.userId,{$pull:{post:result._id}})
            .then(tagResult=>{
                Post.findByIdAndDelete(req.params.id)
            .then(result =>{
             return res.status(200).json({
                 message:'Ok'
             })
            })
            })
        })
        .catch(err =>{
         return res.status(404).json({
             message:'Not Ok'
         })
        });
       })
}


exports.deleteComment = (req,res,next) =>{
    
    const params = req.params.id
    User.findOne({'comments':params}).then(result =>{
        const resultado = result
        if(result){
            User.findByIdAndUpdate(resultado._id,{$pull:{comments:params}})
            .then(resultCommet =>{
                Comment.findById(req.params.id)
            .then(result =>{
              Post.findByIdAndUpdate(result.post,{$pull:{comment:result._id}})
              .then(result=>{
                  console.log('Deletou o comentario do post')
              })
            })
        
            Comment.findByIdAndDelete(req.params.id)
            .then(result =>{
               return res.status(200).json({
                   message:'Ok'
               })
            })
            })
        }else{
            console.log('Nao achou')
        }
      })
      .catch(err =>{
        return res.status(404).json({
            message:'Not Found'
        })
      })

}

//Put Requests


exports.putPost = (req,res,next) =>{

    const id = req.params.id
    const pointsBody = req.body.points

    if(pointsBody < 0){
       return res.status(500)
    }else{
        Post.findByIdAndUpdate(id,{$set:{points:req.body.points}})
        .then(result =>{
            return res.status(200).json({
                message:'Ok',
                object:result
            })
        })
        .catch(err =>{
            console.log('Nop foi')
        })
    } 
}

exports.putTag = (req,res,next) =>{
    const id = req.params.id

   Tags.findByIdAndUpdate(id,{$push:{post:req.body}})
   .then(result =>{
    return status(200).json({
        message:'200'
    })
   })
   .catch(err =>{
       return status(400).json({
           message:'404'
       })
   })


}

exports.putComment = (req,res,next) =>{

    const id = req.params.id
    const pointsBody = req.body.points

    if(pointsBody < 0){
        return res.status(500)
     }else{
    Comment.findByIdAndUpdate(id,{$set:{points:pointsBody}})
    .then(result =>{
        return res.status(200).json({
            message:'Ok'
        })
    })
    .catch(err =>{
        console.log('Nop foi')
    })
}

}






/*
Comment.findById(req.params.id)
            .then(result =>{
              Post.findByIdAndUpdate(result.post,{$pull:{comment:result._id}})
              .then(result=>{
                  console.log('Deletou o comentario do post')
              })
            })
            .catch(err =>{
               console.log('Nao achou o comentario')
            })
        
            Comment.findByIdAndDelete(req.params.id)
            .then(result =>{
               return res.status(200).json({
                   message:'Ok'
               })
            })
            .catch(err =>{
              return res.status(400).json({
                  message:'Not ok'
              })
            })
*/



