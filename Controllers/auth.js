const bcrpty = require('bcryptjs');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');

exports.postLogin = (req,res,next)=>{
     const email = req.body.email

     User.findOne({email:email})
     .then(result =>{
         if(!result){
            console.log('Nop')
         }else{
             bcrpty.compare(req.body.password,result.password)
             .then(resultBcrpy=>{
                 const id = result._id;
                 const token = jwt.sign({id},process.env.SECRET,{
                     expiresIn: '4h'
                 });
                 const refreshToken = jwt.sign({id},process.env.REFRESHSECRET,{expiresIn:'7d'});

                 User.findByIdAndUpdate(id,{AccessToken:token,RefreshToken:refreshToken})
                 .then(resultUser =>{
                    return res.status(200).json({
                        message:token,
                        user:result
                    })
                 })
             })
         }
     })
     .catch(err =>{
        return result.status(500).json({
            message:'Not Ok'
        })
     })

}



exports.postSignup = (req,res,next) =>{

    const salt = bcrpty.genSaltSync(6);
    const hashPassword = bcrpty.hashSync(req.body.password,salt);

    const user = {
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
    }

    const UserModel = new User(user);

    UserModel.save()
    .then(result =>{
            return res.status(200).json({
                message:'Save with sucess',
                user:result
            })
    })
    .catch(err =>{
        const error = new Error(err)
        error.status(500);
        return next(error);
    })

}


exports.postLogout = (req,res,next) =>{

    const token = req.headers.user;

    User.findOne({'AccessToken':token}).then(result =>{
        const user = result
        User.findOneAndUpdate(user.AccessToken,{AccessToken:null,RefreshToken:null})
    .then(result =>{
       return res.status(200).json({
            message:'Ok'
        });
    })
      })
      .catch(err =>{
        return res.status(404).json({
            message:'Not Found'
        })
      })
    }



    /**
     * 
     *  User.findByIdAndUpdate(id,{AccessToken:null,RefreshToken:null})
    .then(result =>{
        res.status(200).json({
            message:'Ok'
        });
    })
      })
      .catch(err =>{
        return res.status(404).json({
            message:'Not Found'
        })
      })

     */