import postModel from "../models/post-model.js";
import CommentModel from "../models/comment-model.js";

const addComment = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;
        const postId = req.params.postId;
        const comment = req.body.comment;
        console.log("printing user in controller", req.body.comment);
        //find pos t 
        postModel.findById(postId).then((post) => {
            if (!post) {
                res.json({ status: "error", message: "No post found", data: null });
            }
            else {
                new CommentModel({
                    UserId: userId,
                    postId: postId,
                    comment: comment,
                }).save().then((comment) => {
                    console.log(comment);
                    postModel.findById(postId).then((post) => {
                        post.comments.push(comment);
                        post.save();
                    }).catch((err) => {
                        res.json({ status: "error", message: err.message, data: null });
                    });
                    res.json({ status: "success", message: "Comment added successfully!", data: comment });
                }).catch((err) => {
                    res.json({ status: "error", message: err.message, data: null });
                });
            }
        }).catch((err) => {
            res.json({ status: "error", message: err.message, mail: "No post found", data: null });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

export default addComment;