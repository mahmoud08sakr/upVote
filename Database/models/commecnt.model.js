import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("Comment", commentSchema);

