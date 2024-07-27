import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { getDashboardData } from '../controllers/dashboardDataController.js';

const dashboardDataRouter = express.Router();

dashboardDataRouter.use(authenticateToken);

dashboardDataRouter.get('/', getDashboardData);

export default dashboardDataRouter;
