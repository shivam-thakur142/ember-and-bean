import Reservation from '../models/Reservation.js';
import { getDbStatus } from '../config/db.js';

// In-memory fallback reservations
let inMemoryReservations = [
  {
    _id: 'mock-res-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:30 AM',
    guests: 2,
    message: 'Corner table by the window with good natural light please.',
    status: 'confirmed',
    bookingReference: 'EB-2026-9041',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mock-res-2',
    name: 'Meera Kapoor',
    email: 'meera.k@example.com',
    phone: '+91 98112 33445',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    time: '04:00 PM',
    guests: 4,
    message: 'Celebrating a small architectural project milestone.',
    status: 'pending',
    bookingReference: 'EB-2026-8812',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mock-res-3',
    name: 'Vikram Singhania',
    email: 'vikram.s@example.com',
    phone: '+91 97654 11223',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    time: '07:30 PM',
    guests: 2,
    message: 'Would love to taste the single origin pour over flights.',
    status: 'confirmed',
    bookingReference: 'EB-2026-7321',
    createdAt: new Date().toISOString(),
  },
];

/**
 * @desc Create new table reservation
 * @route POST /api/reservations
 */
export const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body;

    // Strict validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, phone, date, time, and guests) are required.',
      });
    }

    // Email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Date validation: prevent past dates
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reservation date format.',
      });
    }

    // Normalize selectedDate for midnight comparison
    const checkDate = new Date(date + 'T00:00:00');
    if (checkDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Reservation date cannot be in the past.',
      });
    }

    const guestCount = parseInt(guests, 10);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 20) {
      return res.status(400).json({
        success: false,
        message: 'Number of guests must be between 1 and 20.',
      });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const reservation = await Reservation.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        date: date.trim(),
        time: time.trim(),
        guests: guestCount,
        message: message ? message.trim() : '',
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Your table reservation request has been received. We will confirm shortly!',
        data: reservation,
      });
    }

    // Fallback store
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const mockReservation = {
      _id: `mock-res-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      date: date.trim(),
      time: time.trim(),
      guests: guestCount,
      message: message ? message.trim() : '',
      status: 'pending',
      bookingReference: `EB-${Date.now().toString().slice(-4)}${randomHex}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryReservations.unshift(mockReservation);

    return res.status(201).json({
      success: true,
      message: 'Your table reservation request has been received. We look forward to hosting you!',
      data: mockReservation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all reservations (filtered by status optionally)
 * @route GET /api/reservations
 */
export const getReservations = async (req, res, next) => {
  try {
    const { status, limit = 50 } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const query = {};
      if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
        query.status = status;
      }
      const reservations = await Reservation.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit, 10));

      return res.status(200).json({
        success: true,
        count: reservations.length,
        data: reservations,
      });
    }

    let filtered = [...inMemoryReservations];
    if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
      filtered = filtered.filter((r) => r.status === status);
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      source: 'fallback-cache',
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get single reservation by ID
 * @route GET /api/reservations/:id
 */
export const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.status(200).json({ success: true, data: reservation });
    }

    const reservation = inMemoryReservations.find((r) => r._id === id || r.bookingReference === id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    return res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update reservation status (confirm / cancel / pending)
 * @route PUT /api/reservations/:id
 */
export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status && !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be one of: pending, confirmed, cancelled',
      });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const updated = await Reservation.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.status(200).json({
        success: true,
        message: `Reservation status updated to ${updated.status}`,
        data: updated,
      });
    }

    const index = inMemoryReservations.findIndex((r) => r._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    inMemoryReservations[index] = {
      ...inMemoryReservations[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: `Reservation status updated to ${inMemoryReservations[index].status}`,
      data: inMemoryReservations[index],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete reservation
 * @route DELETE /api/reservations/:id
 */
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const deleted = await Reservation.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.status(200).json({ success: true, message: 'Reservation removed', data: deleted });
    }

    const index = inMemoryReservations.findIndex((r) => r._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    const [deletedRes] = inMemoryReservations.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Reservation removed',
      data: deletedRes,
    });
  } catch (error) {
    next(error);
  }
};
