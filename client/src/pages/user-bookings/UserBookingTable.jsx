import { Input, Typography, Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BOOKING_STATUS } from '../../constants';
import { patchRequest, postRequest } from '../../utils';
import UserBillDialog from './UserBillDialog';
import { toast } from 'react-toastify';

const UserBookingTable = () => {
  const [search, setSearch] = useState('');

  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await postRequest({
        endpoint: '/bookings/my-bookings',
        data: {
          status: [BOOKING_STATUS.BOOKED, BOOKING_STATUS.CHECKED_IN],
        },
      });

      return res?.data || [];
    },
    queryKey: ['userBookings'],
  });

  const TABLE_HEAD = [
    'Room',
    'Check-In',
    'Check-Out',
    'Status',
    'Total Cost',
    'Action',
  ];

  const filteredBookings = bookings?.filter((booking) =>
    booking.room.roomNumber.toLowerCase().includes(search.toLowerCase())
  );

  const cancelBooking = (bookingId) => async () => {
    const res = await patchRequest({
      endpoint: `/bookings/${bookingId}/cancel`,
    });

    if (res.ok) {
      toast.success(res.message);
      refetch();
      return;
    }

    toast.error(res.message);
  };

  if (isLoading) {
    return (
      <Typography variant="h4" className="text-center">
        Loading...
      </Typography>
    );
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">My Bookings</Typography>
        <div>
          <Input
            type="text"
            label="Search by Room Number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
            {filteredBookings?.map((booking, index) => {
              const { _id, room, checkIn, checkOut, status, totalPrice } =
                booking;
              const isLast = index === filteredBookings.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray-300';

              const checkInDate = new Date(checkIn);
              const currentDate = new Date();
              const daysUntilCheckIn = Math.ceil(
                (checkInDate - currentDate) / (1000 * 60 * 60 * 24)
              );
              const canCancel = daysUntilCheckIn > 2;

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
                      {checkInDate.toLocaleDateString()}
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
                    <div className="flex items-center gap-2">
                      <UserBillDialog booking={booking} />
                      {
                        <Button
                          variant="gradient"
                          color="red"
                          size="sm"
                          disabled={!canCancel}
                          onClick={cancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </Button>
                      }
                    </div>
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

export default UserBookingTable;
