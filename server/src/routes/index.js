import express from 'express';
import authRouter from './authRoutes.js';
import menuItemRouter from './menuRoutes.js';
import roomRouter from './roomRoutes.js';
import userRouter from './userRoutes.js';
import staffRouter from './staffRoutes.js';
import bookingRouter from './bookingRoutes.js';
import feedbackRouter from './feedbackRoutes.js';
import dashboardDataRouter from './dashboardRoutes.js';

const apiRouter = express.Router();

const apiRoutes = [
  {
    router: userRouter,
    path: '/users',
  },
  {
    router: authRouter,
    path: '/auth',
  },
  {
    router: roomRouter,
    path: '/rooms',
  },
  {
    router: menuItemRouter,
    path: '/menu-items',
  },
  {
    router: staffRouter,
    path: '/staffs',
  },
  {
    router: bookingRouter,
    path: '/bookings',
  },
  {
    router: feedbackRouter,
    path: '/feedbacks',
  },
  {
    router: dashboardDataRouter,
    path: '/dashboard-data',
  },
];

apiRoutes.forEach((route) => apiRouter.use(route.path, route.router));

export default apiRouter;
