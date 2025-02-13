import postModel from "../../../Database/models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!req.file || !req.file.cloudinaryResult) {
            return res.status(400).json({ message: 'File upload failed' });
        }
        const imageUrl = req.file.cloudinaryResult.secure_url;
        const savedPost = await postModel.create({
            title,
            body,
            image: imageUrl,
            userId: req.user.id,
        });
        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const updatePost = async (req, res) => {
    let userId = req.user.id;
    let postId = req.params.id;
    let { title, body, image } = req.body;
    let post = await postModel.findById(postId);
    if (!post) {
        return res.status(400).json({ message: "Post not found" });
    }
    console.log(JSON.stringify(post.userId), userId);
    if (JSON.stringify(userId) !== JSON.stringify(post.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let updatedPost = await postModel.findByIdAndUpdate(postId, { title, body, image }, { new: true });
    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
}

export const softDeletePost = async (req, res) => {
    let userId = req.user.id;
    let { postId } = req.params;
    let post = await postModel.findById(postId);
    if (!post) {
        return res.status(400).json({ message: "Post not found" });
    }
    if (JSON.stringify(userId) !== JSON.stringify(post.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let updatedPost = await postModel.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });
    res.status(200).json({ message: "Post deleted successfully", post: updatedPost });
}

export const getAllPosts = async (req, res) => {
    let { size = 10, page = 1 } = req.query; 

    try {
        let posts = await postModel.find({ isDeleted: false })
            .sort({ likes: -1 }) 
            .limit(+size)
            .skip((page - 1) * size)
            .populate("userId", "name email")
            .populate({
                path: "comment",
                populate: { path: "userId", select: "name email" }
            });
        res.json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

export const likePost_unlikedPost = async (req, res) => {
    let { id } = req.params;
    let userId = req.user.id;
    let post = await postModel.findById(id);
    if (!post) {
        return res.status(400).json({ message: "Post not found" });
    }
    let index = post.likes.indexOf(userId);
    if (index === -1) {
        post.likes.push(userId);
    } else {
        post.likes.splice(index, 1);
    }
    await post.save();
    res.json({ message: "Post liked/unliked successfully" });
}