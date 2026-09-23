import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.route('/')
  .get(getReservations)
  .post(formLimiter, createReservation);

router.route('/:id')
  .get(getReservationById)
  .put(requireAdmin, updateReservation)
  .delete(requireAdmin, deleteReservation);

export default router;
