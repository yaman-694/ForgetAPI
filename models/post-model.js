import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    //reterive from firebase
    userId: {
        type: String,
        required: true,
    },
    image: {
        type: String,       
    },
    text: {
        type: String, 
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
    hashtags: [{ type: String }],
    mentions: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
}, { timestamps: true } );


export default mongoose.model('PostModel', PostSchema);