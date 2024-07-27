import express from 'express';
import {
  addFoodItemsToBooking,
  addToCart,
  cancelBooking,
  checkIfRoomIsInCart,
  checkInBooking,
  checkoutBooking,
  getAllBookings,
  getCartItems,
  getUserBookings,
  removeFromCart,
  updateBookings,
} from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/auth.js';

const bookingRouter = express.Router();

bookingRouter.use(authenticateToken);

// Route to add a booking to the cart (wishlist)
bookingRouter.post('/cart', addToCart);

bookingRouter.get('/cart-items', getCartItems);

// Route to remove a booking from the cart by booking ID
bookingRouter.delete('/cart/:bookingId', removeFromCart);

// Route to update multiple bookings
bookingRouter.put('/book-room', updateBookings);

bookingRouter.post('/my-bookings', getUserBookings);

bookingRouter.get('/all', getAllBookings);

// Route to check-in a booking
bookingRouter.patch('/:bookingId/check-in', checkInBooking);

// Route to add food items to a booking
bookingRouter.patch('/:bookingId/add-food', addFoodItemsToBooking);

// Route to add food items to a booking
bookingRouter.patch('/:bookingId/check-out', checkoutBooking);
bookingRouter.patch('/:bookingId/cancel', cancelBooking);

bookingRouter.get('/check-cart/room/:roomId', checkIfRoomIsInCart);

export default bookingRouter;
