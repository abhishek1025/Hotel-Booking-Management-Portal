import { Schema } from 'mongoose';

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side'], // Example categories
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
  },
  { timestamps: true }
);

export default menuItemSchema;
