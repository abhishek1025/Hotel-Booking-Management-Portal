import mongoose from 'mongoose';
import { BOOKING_STATUS } from '../../constant/constants.js';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.IN_CART,
    },
    pricePerNight: {
      type: Number,
      min: [0, 'Price per night cannot be negative'],
      default: 0,
    },
    food: [
      {
        itemName: {
          type: String,
        },
        price: {
          type: Number,
          min: [0, 'Price cannot be negative'],
        },
        quantity: {
          type: Number,
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
    roomCost: {
      type: Number,
      min: [0, 'Room cost cannot be negative'],
      default: 0,
    },
    foodCost: {
      type: Number,
      min: [0, 'Food cost cannot be negative'],
      default: 0,
    },
    totalPrice: {
      type: Number,
      min: [0, 'Total price cannot be negative'],
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to calculate costs and total price before saving
bookingSchema.pre('save', async function (next) {
  let roomCost = 0;
  let foodCost = 0;

  // Calculate room cost based on pricePerNight and the duration of the stay
  if (this.pricePerNight && this.checkIn && this.checkOut) {
    const nights = Math.ceil(
      (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24)
    );
    roomCost = this.pricePerNight * nights;
  }

  // Calculate total cost of food items
  if (this.food) {
    this.food.forEach((foodItem) => {
      foodCost += (foodItem.price || 0) * (foodItem.quantity || 0);
    });
  }

  // Set calculated costs
  this.roomCost = roomCost;
  this.foodCost = foodCost;
  this.totalPrice = roomCost + foodCost;

  next();
});

export default bookingSchema;
