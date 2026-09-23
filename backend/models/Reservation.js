import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Reservation date is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Reservation time is required'],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest must be booked'],
      max: [20, 'For parties larger than 20, please contact us directly'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Special request message cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    bookingReference: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique readable booking reference prior to saving
reservationSchema.pre('save', function (next) {
  if (!this.bookingReference) {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    this.bookingReference = `EB-${Date.now().toString().slice(-4)}${randomHex}`;
  }
  next();
});

reservationSchema.index({ date: 1, time: 1, status: 1 });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
