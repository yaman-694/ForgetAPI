import PostModel from '../models/post-model.js'
import { v4 as UUID } from 'uuid';
const addImage = async (req, res) => {

    try {
        const user = req.user;
        const userId = user.id;
        console.log("printing user in controller",userId);
        const fileName = req.file.originalname;
        console.log(fileName);
        const newPost = new PostModel({
            userId: userId,
            image: '../images/'+fileName,
        }).save().then((post) => {
            res.json({ status: "success", message: "Post added successfully!", data: {post:post} });
        }).catch((err) => {
            res.json({ status: "error", message: err.message, data: null });
        });
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const user = req.user;
        const userId = user.id;

        PostModel.findByIdAndDelete(postId).then((post) => {
            if (post.userId == userId) {
                res.json({ status: "success", message: "Post deleted successfully!", data: post });
            } else {
                res.json({ status: "error", message: "You are not authorized to delete this post", data: null });
            }
        }).catch((err) => {
            res.json({ status: "error", message: err.message, data: null });
        });
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}


const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const user = req.user;
        const userId = user.id;
        console.log("printing user in controller",req.file);
        const fileName = req.file.originalname;
        PostModel.findByIdAndUpdate(postId, req.body).then((post) => {
            console.log(post);
        }).catch((err) => {
            res.json({ status: "error", message: err.message, data: null });
        });
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}   

const showPost = async (req,res)=>{
    try{
        postModel.find({}).then((user)=>{
            res.status(200).json({status:"Success",data:user});
        }).catch((error)=>{
            res.status(500).json({status:"Failed",message:error.message});
        })
    }catch(error){
        res.status(500).json({status:"Failed",message:error.message});
    }
}

export default addImage;
export { deletePost, addImage, updatePost ,showPost};






