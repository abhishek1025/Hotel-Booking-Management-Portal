import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';
import { Room } from '../schemaModels/model.js';
import { deleteFile } from '../utils/index.js';

export const createRoom = asyncErrorHandler(async (req, res) => {
  const { roomNumber, roomType, capacity, pricePerNight, description } =
    req.body;
  let images = [];

  // Assuming req.files contains the uploaded images
  if (req.files) {
    images = req.files.map((file) => file.filename); // Or the URL if uploaded to a service
  }

  // Check for existing room number
  const existingRoom = await Room.findOne({ roomNumber });

  if (existingRoom) {
    throwError({
      message: 'Room number already exists',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const room = new Room({
    roomNumber,
    roomType,
    capacity,
    pricePerNight,
    description,
    images,
  });

  await room.save();

  sendSuccessResponse({
    res,
    message: 'Room created successfully',
    data: room,
  });
});

export const getRoomById = asyncErrorHandler(async (req, res) => {
  const roomID = req.params.roomID;

  if (!mongoose.Types.ObjectId.isValid(roomID)) {
    throwError({
      message: 'Invalid Room ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const room = await Room.findById(roomID);

  if (!room) {
    throwError({
      message: 'Room not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Room retrieved successfully',
    data: room,
  });
});

export const updateRoom = asyncErrorHandler(async (req, res) => {
  const roomID = req.params.roomID;

  if (!mongoose.Types.ObjectId.isValid(roomID)) {
    throwError({
      message: 'Invalid Room ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const room = await Room.findById(roomID);
  if (!room) {
    throwError({
      message: 'Room not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Handle new images if provided
  if (req.files && req.files.length > 0) {
    // Delete previous images
    room.images.forEach((imagePath) => {
      if (imagePath) {
        deleteFile(imagePath); // Use the deleteFile utility to remove each image
      }
    });

    // Add new images
    room.images = req.files.map((file) => file.filename); // Or the file URL if using a cloud service
  }

  // Update room details (excluding images, which are already handled)
  room.set(req.body);

  await room.save();

  sendSuccessResponse({
    res,
    message: 'Room updated successfully',
    data: room,
  });
});

export const deleteRoom = asyncErrorHandler(async (req, res) => {
  const roomID = req.params.roomID;

  if (!mongoose.Types.ObjectId.isValid(roomID)) {
    throwError({
      message: 'Invalid Room ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const room = await Room.findById(roomID);
  if (!room) {
    throwError({
      message: 'Room not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Delete associated images
  room.images.forEach((imagePath) => {
    deleteFile(imagePath); // Use the deleteFile utility to remove each image
  });

  // Delete the room record
  await Room.findByIdAndDelete(roomID);

  sendSuccessResponse({
    res,
    message: 'Room deleted successfully',
  });
});

export const getAllRooms = asyncErrorHandler(async (req, res) => {
  const rooms = await Room.find();

  sendSuccessResponse({
    res,
    message: 'Rooms retrieved successfully',
    data: rooms,
  });
});
