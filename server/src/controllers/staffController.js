import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';
import { Staff } from '../schemaModels/model.js';
import { deleteFile } from '../utils/index.js';

export const createStaffMember = asyncErrorHandler(async (req, res) => {
  const { name, email, phone, address, role, salary } = req.body;
  const image = req.file ? req.file.filename : ''; // Store filename

  // Check for existing staff member by email or phone
  const existingStaff = await Staff.findOne({ $or: [{ email }, { phone }] });
  if (existingStaff) {
    throwError({
      message: 'Staff member with this email or phone number already exists',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const staffMember = new Staff({
    name,
    email,
    phone,
    address,
    role,
    salary,
    image,
  });

  await staffMember.save();

  sendSuccessResponse({
    res,
    message: 'Staff member created successfully',
    data: staffMember,
  });
});

export const getAllStaffMembers = asyncErrorHandler(async (req, res) => {
  const { role } = req.query;

  // Build the query object based on the role
  const query = role ? { role } : {};

  // Fetch staff members based on the query
  const staffMembers = await Staff.find(query);

  sendSuccessResponse({
    res,
    message: 'Staff members retrieved successfully',
    data: staffMembers,
  });
});

export const getStaffMemberById = asyncErrorHandler(async (req, res) => {
  const staffID = req.params.staffID;

  if (!mongoose.Types.ObjectId.isValid(staffID)) {
    throwError({
      message: 'Invalid staff ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const staffMember = await Staff.findById(staffID);

  if (!staffMember) {
    throwError({
      message: 'Staff member not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Staff member retrieved successfully',
    data: staffMember,
  });
});

export const updateStaffMember = asyncErrorHandler(async (req, res) => {
  const staffID = req.params.staffID;

  if (!mongoose.Types.ObjectId.isValid(staffID)) {
    throwError({
      message: 'Invalid Staff ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const staffMember = await Staff.findById(staffID);
  if (!staffMember) {
    throwError({
      message: 'Staff member not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Handle new image if provided
  if (req.file) {
    // Delete the previous image if exists
    if (staffMember.image) {
      deleteFile(staffMember.image); // Use the deleteFile utility to remove the previous image
    }

    // Set new image
    staffMember.image = req.file.filename;
  }

  // Update staff details excluding the image, which is already handled
  staffMember.set(req.body);

  await staffMember.save();

  sendSuccessResponse({
    res,
    message: 'Staff member updated successfully',
    data: staffMember,
  });
});

export const deleteStaffMember = asyncErrorHandler(async (req, res) => {
  const staffID = req.params.staffID;

  // Validate staff ID
  if (!mongoose.Types.ObjectId.isValid(staffID)) {
    throwError({
      message: 'Invalid staff ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Find the staff member by ID
  const staffMember = await Staff.findById(staffID);

  if (!staffMember) {
    return res.status(404).json({ message: 'Staff member not found' });
  }

  // Toggle the isActive status
  staffMember.isActive = !staffMember.isActive;

  // Save the updated staff member
  await staffMember.save();

  // Determine the appropriate message based on the new status
  const statusMessage = staffMember.isActive
    ? 'Staff member activated successfully'
    : 'Staff member deactivated successfully';

  // Send a success response
  sendSuccessResponse({
    res,
    message: statusMessage,
    data: staffMember,
  });
});
