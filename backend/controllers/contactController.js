import ContactMessage from '../models/ContactMessage.js';
import { getDbStatus } from '../config/db.js';

let inMemoryMessages = [
  {
    _id: 'mock-msg-1',
    name: 'Siddharth Varma',
    email: 'siddharth@coffeejournal.com',
    phone: '+91 98200 11990',
    subject: 'Roastery Tour & Feature',
    message: 'We are publishing a feature on micro-roasters in Northern India and would love to interview your head roaster.',
    status: 'unread',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

/**
 * @desc Submit new contact message
 * @route POST /api/contact
 */
export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const savedMsg = await ContactMessage.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out. The Ember & Bean team will reply promptly.',
        data: savedMsg,
      });
    }

    const mockMsg = {
      _id: `mock-msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    inMemoryMessages.unshift(mockMsg);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. The Ember & Bean team will reply promptly.',
      data: mockMsg,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all contact messages (Admin)
 * @route GET /api/contact
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    }

    return res.status(200).json({
      success: true,
      count: inMemoryMessages.length,
      data: inMemoryMessages,
    });
  } catch (error) {
    next(error);
  }
};
