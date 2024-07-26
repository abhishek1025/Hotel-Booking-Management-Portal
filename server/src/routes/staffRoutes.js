import express from 'express';
import {
  createStaffMember,
  deleteStaffMember,
  getAllStaffMembers,
  getStaffMemberById,
  updateStaffMember,
} from '../controllers/staffController.js';
import upload from '../middlewares/fileUpload.js';

const staffRouter = express.Router();

// Route for creating a staff member and retrieving all staff members
staffRouter
  .route('/')
  .post(upload.single('image'), createStaffMember) // Create a new staff member
  .get(getAllStaffMembers); // Get all staff members

// Routes for retrieving, updating, and deleting a specific staff member by ID
staffRouter
  .route('/:staffID')
  .get(getStaffMemberById) // Get a specific staff member by ID
  .put(upload.single('image'), updateStaffMember) // Update a specific staff member by ID
  .delete(deleteStaffMember); // Delete a specific staff member by ID

export default staffRouter;
