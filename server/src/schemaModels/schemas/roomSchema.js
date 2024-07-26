import mongoose from 'mongoose';
import { Feedback } from '../model.js';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      unique: true,
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      enum: {
        values: ['Single', 'Double', 'Suite'],
        message: '{VALUE} is not supported for room type',
      },
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
      min: [0, 'Price per night cannot be negative'],
    },
    description: {
      type: String,
      default: '',
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Predefined amenities based on room type
const predefinedAmenities = {
  Single: ['WiFi', 'Air Conditioning', 'TV'],
  Double: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
  Suite: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Jacuzzi'],
};

// Pre-save middleware to set amenities based on room type
roomSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('roomType')) {
    this.amenities = predefinedAmenities[this.roomType] || [];
  }
  next();
});

export default roomSchema;
