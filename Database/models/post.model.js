import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
    ,
    { toJSON: { virtuals: true }, toObject: { virtuals: true } },
    { timestamps: true })




postSchema.virtual("comment", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment"
})


const postModel = mongoose.model("Post", postSchema);
export default postModel;