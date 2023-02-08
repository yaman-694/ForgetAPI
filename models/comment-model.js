import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    // Id of user who had comment
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true,
    },
    // id of post on which user commented
    postId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'userpost',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    //likes on comment
    likes:{
        type: Number,
        default: 0
    },
    // list of user who had liked the comment
    likedBy:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
    }],
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true } );


export default mongoose.model('CommentModel', CommentSchema);