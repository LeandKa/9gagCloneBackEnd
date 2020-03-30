const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,'./img')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
    fileFilter:(req,file,cb)=>{
        if(file.minetype !== 'img/png' || file.minetype !== 'img/gif' || file.minetype !== 'image/jpeg'){
             return cb(null,false);
        }else{
            cb(null,true);
        }
    }
})


const upload = multer({
    storage:fileStorage
})

module.exports = upload;