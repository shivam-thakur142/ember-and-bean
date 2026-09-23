import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [100, 'Item name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Item description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['coffee', 'non-coffee', 'bakery', 'desserts'],
        message: '{VALUE} is not a supported category',
      },
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    brewMethod: {
      type: String,
      trim: true,
    },
    calories: {
      type: Number,
      default: null,
    },
    origin: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient category filtering and featured queries
menuItemSchema.index({ category: 1, isFeatured: -1 });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
