const express = require('express');
const router = express.Router();
const gets = require('../Controllers/gets')


router.get('/comment',gets.getComment);
router.get('/post/:page',gets.getPost);
router.get('/tags',gets.getTags);
router.get('/post/comments/:postId',gets.getOne);
router.get('/user',gets.getOneUser);
router.get('/TagPosts/:tagId',gets.getTagPosts);





module.exports = router;