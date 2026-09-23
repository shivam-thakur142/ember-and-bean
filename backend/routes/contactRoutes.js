import express from 'express';
import {
  createContactMessage,
  getContactMessages,
} from '../controllers/contactController.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.route('/')
  .get(requireAdmin, getContactMessages)
  .post(formLimiter, createContactMessage);

export default router;
