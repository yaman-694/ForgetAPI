import express from 'express';
import multer from 'multer';
const router = express.Router();

import * as path from 'path'
//import controllers
import {addImage,deletePost,updatePost,showPost} from '../controllers/post-controller.js';
import verifyToken from '../middleware/verifyToken.js'
import likePost from '../controllers/like-post-controller.js';
import addComment from '../controllers/commnet-post.js';
import postModel from '../models/post-model.js';
//deep modify this function rename the name of file then upload and so we can 
// use the name of the file in the controllers/user-post.js 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        // make filename as UserId/fileName.extension
        cb(null,file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||file.mimetype==='image/png') {
        cb(null, true)
        // console.log(file)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage});

//post
router.post('/upload',verifyToken,upload.single('image'),addImage).delete('/delete/:id',verifyToken,deletePost).patch('/update',verifyToken,updatePost);
router.get('/showPost',verifyToken,showPost);
//likes
router.post('/like/:postId',verifyToken,likePost);
//comment
router.post('/comment/:postId',verifyToken,addComment);

export default router;
