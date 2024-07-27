import { sendSuccessResponse } from '../helpers/apiResponseHandler.js';
import asyncErrorHandler from '../helpers/asyncErrorHandler.js';
import {
  Booking,
  Feedback,
  MenuItem,
  Room,
  Staff,
} from '../schemaModels/model.js';
// Define month names
const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

// Helper function to get room occupancy data
const getMonthlyOccupancyData = async (year) => {
  // Ensure the year is a valid number and a 4-digit year
  if (!year || !/^\d{4}$/.test(year)) {
    throw new Error('Invalid or missing year');
  }

  const startOfYear = new Date(`${year}-01-01`);
  const endOfYear = new Date(`${year}-12-31`);

  const data = await Booking.aggregate([
    {
      $match: {
        status: { $in: ['Booked', 'CheckedIn'] },
        checkIn: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: '$checkIn' },
        occupiedRooms: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Initialize occupancy data for all months with zero occupancy
  const monthlyOccupancy = monthNames.map((month, index) => ({
    mon: month,
    occupancyCount: 0,
  }));

  // Update the monthly occupancy data with actual counts
  data.forEach(({ _id, occupiedRooms }) => {
    monthlyOccupancy[_id - 1].occupancyCount = occupiedRooms;
  });

  return monthlyOccupancy;
};

// Helper function to get the distribution of staff roles
const getStaffRoleDistribution = async () => {
  try {
    // Aggregation pipeline to group staff by role and count the number of staff members in each role
    const roleDistribution = await Staff.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // Sort by the number of staff members in each role, descending
      },
    ]);

    // Transform the aggregation result into the desired format
    const formattedData = roleDistribution.map((roleData) => ({
      role: roleData._id,
      count: roleData.count,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching staff role distribution:', error);
    throw error;
  }
};

// Helper function to get the distribution of feedback ratings
const getFeedbackRatingsDistribution = async () => {
  // Aggregation pipeline to group feedback by room and rating, then count the number of entries for each rating
  const ratingsDistribution = await Room.find().select('roomNumber ratings');
  return ratingsDistribution;
};

// Helper function to get cumulative counts for dashboard analytics
export const getDashboardOverview = async () => {
  // Count the number of documents in each collection
  const roomCountPromise = Room.countDocuments({});
  const bookingCountPromise = Booking.countDocuments({});
  const staffCountPromise = Staff.countDocuments({});
  const menuItemCountPromise = MenuItem.countDocuments({});
  const feedbackCountPromise = Feedback.countDocuments({});

  // Await all promises simultaneously for better performance
  const [roomCount, bookingCount, staffCount, menuItemCount, feedbackCount] =
    await Promise.all([
      roomCountPromise,
      bookingCountPromise,
      staffCountPromise,
      menuItemCountPromise,
      feedbackCountPromise,
    ]);

  // Return the cumulative counts in a structured format
  return {
    rooms: roomCount,
    bookings: bookingCount,
    staff: staffCount,
    menuItems: menuItemCount,
    feedbacks: feedbackCount,
  };
};

export const getDashboardData = asyncErrorHandler(async (req, res) => {
  // const year = req.query.year || new Date().getFullYear();
  const [
    // monthlyOccupancy,
    staffDistribution,
    feedbackDistribution,
    overviewData,
  ] = await Promise.all([
    // getMonthlyOccupancyData(year),
    getStaffRoleDistribution(),
    getFeedbackRatingsDistribution(),
    getDashboardOverview(),
  ]);

  sendSuccessResponse({
    res,
    data: {
      overviewData,
      feedbackDistribution,
      staffDistribution,
      // monthlyOccupancy,
    },
  });
});
