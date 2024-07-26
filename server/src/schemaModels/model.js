import mongoose from 'mongoose';
import bookingSchema from './schemas/bookingSchema.js';
import expiredTokenStoreSchema from './schemas/expiredTokenStoreSchema.js';
import feedbackSchema from './schemas/feedbackSchema.js';
import menuItemSchema from './schemas/menuItemSchema.js';
import roomSchema from './schemas/roomSchema.js';
import staffSchema from './schemas/staffSchema.js';
import userSchema from './schemas/userSchema.js';

export const User = mongoose.model('User', userSchema);
export const ExpiredTokenStore = mongoose.model(
  'ExpiredTokenStore',
  expiredTokenStoreSchema
);
export const Room = mongoose.model('Room', roomSchema);
export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export const Staff = mongoose.model('Staff', staffSchema);
export const Booking = mongoose.model('Booking', bookingSchema);
export const Feedback = mongoose.model('Feedback', feedbackSchema);
