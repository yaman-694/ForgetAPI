import commentModel from "../models/comment-model.js";
import postModel from "../models/post-model.js";
import _ from "lodash";
const likePost = async (req, res) => {
    try{
        //get user id
        const user = req.user;
        const userId = user.id;
        //get post id
        const postId = req.params.postId;  

        const post = await postModel.findById(postId).then((post) => {
            if (!post) {
                res.json({ status: "error", message: "No post found", data: null });
            }
            else {

                //check if user has already liked the post
                const liked = _.find(post.likedBy, (id) => {
                    return id == userId;
                });
                if (liked) {
                    //decrement likes
                    post.likes-=1;
                    post.save().then((post) => {
                    //delete the user id from the array
                    post.likedBy = _.filter(post.likedBy, (id) => {
                        return id != userId;
                    });
                    post.save();
                    res.json({ status: "success", message: "post will be disliked", data: post });
                }).catch((err) => {
                    res.json({ status: "error", message: err.message, data: null });
                });
                    return;
                }
                //add user id to the array
                post.likedBy.push(userId);
                post.save().then((postd) => {;
                //increment likes
                post.likes += 1;
                post.save();
                res.json({ status: "success", message: "Post liked successfully!", data: post });
                }).catch((err) => {
                    res.json({ status: "error", message: err.message, data: null });
                });
            }
        }).catch((err) => {
            res.json({ status: "error", message: err.message, data: null });
        });
        
    }catch(error){
        res.status(400).json({ status: "error", message: error.message, data: null });
    }
}

export default likePost;