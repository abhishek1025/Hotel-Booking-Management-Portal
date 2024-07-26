import express from 'express';
import {
  createFeedback,
  getAllFeedbacks,
} from '../controllers/feedbackController.js';
import { authenticateToken } from '../middlewares/auth.js';

const feedbackRouter = express.Router();

feedbackRouter.use(authenticateToken);

feedbackRouter.route('/').get(getAllFeedbacks).post(createFeedback);

export default feedbackRouter;
