import express from 'express';
import { adminLogin, getAdminStats } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/stats', requireAdmin, getAdminStats);

export default router;
