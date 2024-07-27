import { Input, Option, Select, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRequest } from '../../../utils/apiHandler';
import { BOOKING_STATUS } from '../../../constants';
import BookingActionButton from './BookingActionBtns';
import FoodOrderDialog from './FoodOrderDialog';

const BookingTable = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/bookings/all?status=${statusFilter}`,
      });

      return res?.data || [];
    },
    queryKey: ['bookings', statusFilter],
  });

  const TABLE_HEAD = [
    'User',
    'Room',
    'Check-In',
    'Check-Out',
    'Status',
    'Per Night',
    'Actions',
  ];

  const filteredBookings = bookings?.filter((booking) => {
    return (
      booking.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      ((booking.user.email.toLowerCase().includes(search.toLowerCase()) ||
        booking.room.roomNumber.toLowerCase().includes(search.toLowerCase())) &&
        (statusFilter === '' || booking.status === statusFilter))
    );
  });

  if (isLoading) {
    return <Typography variant="h4">Loading ....</Typography>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">Bookings</Typography>
        <div className="flex gap-4">
          <Input
            type="text"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          >
            {Object.entries(BOOKING_STATUS)
              .filter((item) => item[1] !== BOOKING_STATUS.IN_CART)
              .map(([key, value]) => {
                return (
                  <Option key={value} value={value}>
                    {key.split('_').join(' ')}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-100 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredBookings?.map((booking, index) => {
            const { _id, user, room, checkIn, checkOut, status, totalPrice } =
              booking;
            const isLast = index === filteredBookings.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={_id}>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <span className="font-bold">{user.fullName}</span>
                    <br />
                    {user.email}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {room.roomNumber}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {new Date(checkIn).toLocaleDateString()}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {new Date(checkOut).toLocaleDateString()}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {status}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    NRP {totalPrice}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <div className="space-x-2">
                    <BookingActionButton
                      status={status}
                      bookingId={_id}
                      onSuccess={refetch}
                      booking={booking}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
