const user = require('../Models/user');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.headers.token

    user.findOne({AccessToken:token})
    .then(result=>{
        jwt.verify(result.AccessToken,process.env.SECRET,(err,decoded)=>{
            if(err){
                res.status(500).json({
                    message:'NoT Authentication'
                })
            }
            next();
        })
       
    })
    .catch(err =>{
        console.log('Nop')
    })
}