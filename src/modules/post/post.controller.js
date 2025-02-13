import { Router } from 'express';
import { auth } from '../../utilts/verifyToken.js';
import { upload, uploadToCloudinary } from '../../utilts/multer.js';
import postModel from '../../../Database/models/post.model.js';
import { createPost, getAllPosts, likePost_unlikedPost, softDeletePost, updatePost } from './post.service.js';
import { validation } from '../../utilts/validation.js';
import { createPostValidation, updatePostValidation } from './post.validation.js';
const router = Router({
    strict: true,
    mergeParams: true
});


router.post('/createPost', auth, upload.single('image'), uploadToCloudinary, validation(createPostValidation), createPost);
router.patch('/updatePost/:id', auth, upload.single('image'), uploadToCloudinary, validation(updatePostValidation), updatePost);
router.delete('/deletePost/:id', auth, softDeletePost);
router.get('/getPosts', auth, getAllPosts)
router.patch('/likePost_unlikedPost/:id', auth,likePost_unlikedPost)
export default router