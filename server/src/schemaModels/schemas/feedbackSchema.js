import mongoose from 'mongoose';
import { Room } from '../model.js';

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be an integer',
      },
    },
    comment: {
      type: String,
      trim: true,
      max: 500, // Optional: Limit the length of comments
    },
  },
  { timestamps: true }
);

// Function to update the room's average rating
const updateRoomAverageRating = async function (roomId) {
  // Calculate the new average rating
  const feedbacks = await mongoose.model('Feedback').find({ room: roomId });
  const totalFeedbacks = feedbacks.length;
  let averageRating = totalFeedbacks
    ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      totalFeedbacks
    : 0;

  // Round the average rating to the nearest integer
  averageRating = Math.round(averageRating);

  // Update the room with the new average rating
  await Room.findByIdAndUpdate(roomId, { ratings: averageRating });
};

// After a feedback is saved, update the room's average rating
feedbackSchema.post('save', function () {
  updateRoomAverageRating(this.room);
});

export default feedbackSchema;
