import { Router } from 'express';
import { auth } from '../../utilts/verifyToken.js';
import { createComment, deleteComment, getComments } from './comment.service.js';
const router = Router({
    strict: true,
    mergeParams: true
});


router.post('/createComment/:postId', auth, createComment);
router.delete('/post/:postId/comment/:commentId', auth, deleteComment);
router.get('/:postId', auth, getComments);

export default router