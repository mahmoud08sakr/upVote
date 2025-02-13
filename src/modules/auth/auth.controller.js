import { Router } from 'express';
import { sendEmail } from '../../utilts/sendEmail.js';
import userModel from '../../../Database/models/user.model.js';
import { signup ,confirmEmail, login } from './auth.service.js';
const router = Router();

router.post('/signup', signup);
router.get('/confirm-email/:token', confirmEmail);
router.post('/login', login);

export default router