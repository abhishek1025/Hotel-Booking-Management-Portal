import { sendSuccessResponse } from '../helpers/apiResponseHandler.js';
import asyncErrorHandler from '../helpers/asyncErrorHandler.js';
import { Feedback } from '../schemaModels/model.js';

export const createFeedback = asyncErrorHandler(async (req, res) => {
  const { room, rating, comment } = req.body;
  const user = req.user._id; // Assuming user ID is set in the request

  const feedback = new Feedback({ user, room, rating, comment });
  await feedback.save();

  sendSuccessResponse({
    res,
    message: 'Feedback created successfully',
    data: feedback,
  });
});

// Get All Feedbacks
export const getAllFeedbacks = asyncErrorHandler(async (req, res) => {
  const { userId } = req.query;

  let filter = {};
  if (userId) filter.user = userId;

  const feedbacks = await Feedback.find(filter).populate('room');

  sendSuccessResponse({
    res,
    message: 'All feedbacks retrieved successfully',
    data: feedbacks,
  });
});
