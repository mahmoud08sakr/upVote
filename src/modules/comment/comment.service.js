import commentModel from '../../../Database/models/commecnt.model.js'

export const createComment = async (req, res) => {
    let { commentId } = req.query;
    let { postId } = req.params;
    let { comment } = req.body;
    let userId = req.user.id;
    if (commentId && ! await commentModel.findById(commentId)) {
        return res.status(400).json({ message: "Invalid commentId" });
    }
    let newComment = await commentModel.create({
        comment,
        postId,
        userId,
        parentComment: commentId || null,
    });
    res.status(201).json({ message: "Comment created successfully", newComment });
};

export const deleteComment = async (req, res) => {
    let { commentId, postId } = req.params;
    let userId = req.user.id;
    let deleteComment = await commentModel.findByIdAndUpdate({ _id: commentId, postId, userId }, { isDeleted: true }, { new: true });
    if (deleteComment) {
        return res.json({ message: "Comment deleted successfully" });
    }
    return res.json({ message: "Comment error" });
}


export const getComments = async (req, res) => {
    let { postId } = req.params
    let comments = await commentModel.find({ postId, isDeleted: false }).populate('userId', 'name email')
    res.json({ comments })
}