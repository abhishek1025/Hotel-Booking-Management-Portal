import express from 'express';
import {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAllRooms,
} from '../controllers/roomController.js';
import { authenticateToken } from '../middlewares/auth.js';
import upload from '../middlewares/fileUpload.js';

const roomRouter = express.Router();

// Routes accessible without authentication
roomRouter.get('/', getAllRooms);
roomRouter.get('/:roomID', getRoomById);

// Routes that require authentication
roomRouter.post('/', upload.array('images', 4), createRoom);

roomRouter.put('/:roomID', upload.array('images', 4), updateRoom);

roomRouter.delete('/:roomID', deleteRoom);

export default roomRouter;
