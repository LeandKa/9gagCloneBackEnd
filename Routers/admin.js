const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');
const isAuth = require('../Util/is-Auth');
const upload = require('../Util/multerConfig');


//Post Requests

router.post('/create-post',isAuth,upload.single("img"),adminController.postPost);
router.post('/create-tags',isAuth,adminController.postTags);
router.post('/create-comment',isAuth,adminController.postComment);

//Delete Requests

router.delete('/delete-post/:id',isAuth,adminController.deletePost);
router.delete('/delete-comment/:id',isAuth,adminController.deleteComment);

//Put Requests

router.put('/edit-post/:id',isAuth,adminController.putPost);
router.put('/edit-tag/:id',isAuth,adminController.putTag);
router.put('/edit-comment/:id',isAuth,adminController.putComment);


module.exports = router;