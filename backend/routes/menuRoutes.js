import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(requireAdmin, createMenuItem);

router.route('/:id')
  .get(getMenuItemById)
  .put(requireAdmin, updateMenuItem)
  .delete(requireAdmin, deleteMenuItem);

export default router;
