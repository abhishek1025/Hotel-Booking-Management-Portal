import mongoose from 'mongoose';
import asyncErrorHandler from '../helpers/asyncErrorHandler.js';
import { Booking } from '../schemaModels/model.js';
import throwError from '../helpers/createError.js';
import { BOOKING_STATUS, HttpStatus } from '../constant/constants.js';
import sendSuccessResponse from '../helpers/apiResponseHandler.js';

export const addToCart = asyncErrorHandler(async (req, res) => {
  const user = req._id;
  const { room, pricePerNight } = req.body;

  if (!user || !room || !pricePerNight) {
    throwError({
      message: 'Missing required booking details',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Check if the room is already added to the cart by the user
  const existingBooking = await Booking.findOne({
    user,
    room,
    status: 'InCart', // Assuming 'InCart' indicates the item is in the cart
  });

  if (existingBooking) {
    throwError({
      message: 'This room is already in your cart',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const booking = new Booking({
    user,
    room,
    pricePerNight,
  });

  await booking.save();

  sendSuccessResponse({
    res,
    message: 'Added to wishlist',
    data: booking,
  });
});

export const getCartItems = asyncErrorHandler(async (req, res) => {
  const userID = req._id;

  if (!mongoose.isValidObjectId(userID)) {
    throwError({
      message: 'Invalid User ID',
    });
  }

  const cartItems = await Booking.find({
    user: userID,
    status: BOOKING_STATUS.IN_CART,
  }).populate({
    path: 'room',
  });

  sendSuccessResponse({
    res,
    message: 'All Cart items',
    data: cartItems,
  });
});

export const removeFromCart = asyncErrorHandler(async (req, res) => {
  const bookingId = req.params.bookingId;

  // Check if the provided ID is a valid mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throwError({
      message: 'Invalid booking ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find and delete the booking by ID
  const booking = await Booking.findByIdAndDelete(bookingId);

  if (!booking) {
    throwError({
      message: 'Booking not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Booking deleted from cart successfully',
    data: booking,
  });
});

export const updateBookings = asyncErrorHandler(async (req, res) => {
  const bookingIDs = req.body.bookings;

  const { checkIn, checkOut } = req.body;

  if (bookingIDs.length === 0) {
    throwError({
      message: 'Invalid or empty bookings data',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const updatedBookings = [];

  for (const bookingId of bookingIDs) {
    if (!bookingId || !mongoose.isValidObjectId(bookingId)) {
      throwError({
        message: 'Invalid or missing booking ID',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (!checkIn || !checkOut) {
      throwError({
        message: 'Missing check-in or check-out time',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      status: BOOKING_STATUS.IN_CART,
    }).populate({
      path: 'room',
    });

    if (!booking) {
      throwError({
        message: `Booking not found for ID ${bookingId}`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    // Check if the room is available for the new dates
    const overlappingBooking = await Booking.findOne({
      room: booking.room._id,
      _id: { $ne: bookingId }, // Exclude the current booking from the check
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) },
        },
      ],
      status: { $in: ['InCart', 'Booked', 'CheckedIn'] }, // Only check active bookings
    });

    if (overlappingBooking) {
      throwError({
        message: `Room ${booking.room.roomNumber} is already booked from ${overlappingBooking.checkIn} to ${overlappingBooking.checkOut}`,
        statusCode: HttpStatus.CONFLICT,
      });
    }

    // If no overlap, proceed with updating the booking
    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.status = BOOKING_STATUS.BOOKED;

    await booking.save();
    updatedBookings.push(booking);
  }

  sendSuccessResponse({
    res,
    message: 'Bookings updated successfully',
    data: updatedBookings,
  });
});

export const getUserBookings = asyncErrorHandler(async (req, res) => {
  const user = req._id;
  const { status } = req.body; // Get the status filter from query parameters


  if (!user) {
    throwError({
      message: 'User ID is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Build the query object
  let query = { user: user };

  // If status is provided, add it to the query
  if (status) {
    query.status = {
      $in: status,
    };
  }

  // Fetch bookings based on the query
  const bookings = await Booking.find(query).populate('room');

  if (!bookings || bookings.length === 0) {
    throwError({
      message: 'No bookings found for this user',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'User bookings retrieved successfully',
    data: bookings,
  });
});

export const addFoodItemsToBooking = asyncErrorHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { items } = req.body;

  // Validate the booking ID
  if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    throwError({
      message: 'Invalid or missing booking ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Validate the items array
  if (!Array.isArray(items) || items.length === 0) {
    throwError({
      message: 'Items must be a non-empty array',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find the booking by ID
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throwError({
      message: `Booking not found for ID ${bookingId}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Check if the booking status is 'CheckedIn'
  if (booking.status !== BOOKING_STATUS.CHECKED_IN) {
    throwError({
      message:
        'Food items can only be added to bookings with status "CheckedIn"',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  // Iterate over items and validate each item
  items.forEach((item) => {
    const { itemName, price, quantity } = item;

    if (!itemName || !price || !quantity) {
      throwError({
        message: 'Item name, Price, Quantity is required',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    // Add the validated item to the booking's food array
    booking.food.push({ itemName, price, quantity });
  });

  // Save the updated booking
  await booking.save();

  sendSuccessResponse({
    res,
    message: 'Food items added to booking successfully',
    data: booking,
  });
});

export const checkInBooking = asyncErrorHandler(async (req, res) => {
  const { bookingId } = req.params;

  // Validate the booking ID
  if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    throwError({
      message: 'Invalid or missing booking ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find the booking by ID
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throwError({
      message: `Booking not found for ID ${bookingId}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Check if the booking is eligible for check-in
  if (booking.status !== BOOKING_STATUS.BOOKED) {
    throwError({
      message: 'Booking is not eligible for check-in',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  // Update the booking status to 'CheckedIn'
  booking.status = BOOKING_STATUS.CHECKED_IN;
  booking.checkIn = new Date(); // Record the check-in time

  // Save the updated booking
  await booking.save();

  sendSuccessResponse({
    res,
    message: 'Booking checked in successfully',
    data: booking,
  });
});

export const checkoutBooking = asyncErrorHandler(async (req, res) => {
  const { bookingId } = req.params;

  // Validate the booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throwError({
      message: 'Invalid booking ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find the booking by ID
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throwError({
      message: 'Booking not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Check if the booking is eligible for checkout
  if (booking.status !== BOOKING_STATUS.CHECKED_IN) {
    throwError({
      message: 'Booking is not eligible for checkout',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  // Update the booking status to 'CheckedOut'
  booking.status = BOOKING_STATUS.CHECKED_OUT;

  // Save the updated booking
  await booking.save();

  // Respond with the updated booking information
  sendSuccessResponse({
    res,
    message: 'Checked out successfully',
  });
});

export const cancelBooking = asyncErrorHandler(async (req, res) => {
  const { bookingId } = req.params;

  // Validate the booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throwError({
      message: 'Invalid booking ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find the booking by ID
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throwError({
      message: 'Booking not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Check if the booking is eligible for cancellation (only if status is 'Booked')
  if (booking.status !== BOOKING_STATUS.BOOKED) {
    throwError({
      message: 'Booking can only be canceled if it is currently booked',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  // Ensure there is more than one day left before the check-in date
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const checkInDate = new Date(booking.checkIn);

  if (checkInDate - currentDate <= oneDayInMillis) {
    throwError({
      message:
        'Bookings can only be canceled if there is more than one day left before check-in',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  // Update the booking status to 'Cancelled'
  booking.status = BOOKING_STATUS.CANCELLED;

  // Save the updated booking
  await booking.save();

  // Respond with the updated booking information
  sendSuccessResponse({
    res,
    message: 'Booking canceled successfully',
  });
});

export const getAllBookings = asyncErrorHandler(async (req, res) => {
  const { status } = req.query;

  const filter = status
    ? { status }
    : {
        status: {
          $in: [
            BOOKING_STATUS.BOOKED,
            BOOKING_STATUS.CHECKED_IN,
            BOOKING_STATUS.CHECKED_OUT,
          ],
        },
      };

  // Fetch all bookings or filtered bookings based on the provided status
  const bookings = await Booking.find(filter).populate('user room');

  // Respond with the list of bookings
  sendSuccessResponse({
    res,
    message: 'Bookings retrieved successfully',
    data: bookings,
  });
});

export const checkIfRoomIsInCart = asyncErrorHandler(async (req, res) => {
  const userId = req._id;
  const roomId = req.params.roomId;

  const booking = await Booking.findOne({
    user: userId,
    status: BOOKING_STATUS.IN_CART,
    room: roomId,
  });

  console.log(booking);

  sendSuccessResponse({
    res,
    data: {
      isInCart: !!booking,
    },
  });
});
