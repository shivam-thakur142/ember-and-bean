import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';
import ContactMessage from '../models/ContactMessage.js';
import { getDbStatus } from '../config/db.js';

/**
 * @desc Verify admin credentials
 * @route POST /api/admin/login
 */
export const adminLogin = async (req, res) => {
  const { password } = req.body;
  const adminSecret = process.env.ADMIN_SECRET || 'ember_bean_secret_admin_2026';

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  if (password === adminSecret) {
    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token: adminSecret,
      user: {
        role: 'admin',
        name: 'Ember & Bean Master',
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrative password.',
  });
};

/**
 * @desc Get administrative analytics & overview stats
 * @route GET /api/admin/stats
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const [
        totalReservations,
        pendingReservations,
        confirmedReservations,
        cancelledReservations,
        totalMenuItems,
        totalMessages,
        recentReservations,
      ] = await Promise.all([
        Reservation.countDocuments(),
        Reservation.countDocuments({ status: 'pending' }),
        Reservation.countDocuments({ status: 'confirmed' }),
        Reservation.countDocuments({ status: 'cancelled' }),
        MenuItem.countDocuments(),
        ContactMessage.countDocuments(),
        Reservation.find().sort({ createdAt: -1 }).limit(5),
      ]);

      return res.status(200).json({
        success: true,
        data: {
          totalReservations,
          pendingReservations,
          confirmedReservations,
          cancelledReservations,
          totalMenuItems,
          totalMessages,
          recentReservations,
          dbStatus,
        },
      });
    }

    // In-memory stats when DB is offline
    return res.status(200).json({
      success: true,
      data: {
        totalReservations: 3,
        pendingReservations: 1,
        confirmedReservations: 2,
        cancelledReservations: 0,
        totalMenuItems: 19,
        totalMessages: 1,
        recentReservations: [],
        dbStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
