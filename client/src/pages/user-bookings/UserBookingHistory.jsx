import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { BOOKING_STATUS } from '../../constants';
import { postRequest } from '../../utils';
import UserBillDialog from './UserBillDialog';

const UserBookingHistory = () => {
  const { data: bookings, isLoading } = useQuery({
    queryFn: async () => {
      const res = await postRequest({
        endpoint: '/bookings/my-bookings',
        data: {
          status: [BOOKING_STATUS.CHECKED_OUT, BOOKING_STATUS.CANCELLED],
        },
      });

      return res?.data || [];
    },
    queryKey: ['bookingHistory'],
  });

  const TABLE_HEAD = [
    'Room',
    'Check-In',
    'Check-Out',
    'Status',
    'Total Cost',
    'Action',
  ];

  if (isLoading) {
    return <Typography variant="h4" className='text-center'>Loading...</Typography>;
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">Booking History</Typography>
      </div>

      <div className="overflow-auto rounded-lg shadow-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-300 bg-gray-100 p-4 text-left"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => {
              const { _id, room, checkIn, checkOut, status, totalPrice } =
                booking;
              const isLast = index === bookings.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray-300';

              return (
                <tr key={_id} className="hover:bg-gray-100 transition-colors">
                  <td className={`${classes} bg-white`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {room.roomNumber}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-white`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(checkIn).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-white`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(checkOut).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-white`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-white`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      NPR {totalPrice}
                    </Typography>
                  </td>

                  <td className={`${classes} bg-white`}>
                    <UserBillDialog booking={booking} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookingHistory;
