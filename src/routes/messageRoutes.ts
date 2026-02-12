import { Router } from 'express';
import { createMessage, getMessage } from '../controllers/messageController.js';

const router = Router();

router.post('/messages', createMessage);
router.get('/messages/:shortId', getMessage);

export default router;
