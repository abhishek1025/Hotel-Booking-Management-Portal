import { IconButton, Typography } from '@material-tailwind/react';

import { useQuery } from '@tanstack/react-query';
import { FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteRequest, getRequest } from '../../../utils/apiHandler';
import AddRoomDialog from './AddRoomDialog';
import EditRoomDialog from './EditRoomDialog';
import RoomDesDialog from './RoomDesc';

const RoomsTable = () => {
  const {
    data: TABLE_ROWS,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/rooms',
      });

      return res?.data || [];
    },
    queryKey: ['rooms'],
  });

  const TABLE_HEAD = [
    'Room No',
    'Type',
    'Capacity',
    'Price',
    'Ratings',
    'Description',
    'Action',
  ];

  const deleteRoom = (id) => async () => {
    const res = await deleteRequest({
      endpoint: `/rooms/${id}`,
    });

    if (res.ok) {
      toast.success(res.message);
      refetch();
      return;
    }

    toast.error(res.message);
  };

  if (isLoading) {
    return <Typography variant="h4">Loading ....</Typography>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">Rooms</Typography>
        <AddRoomDialog onCreate={refetch} />
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
          {TABLE_ROWS.map((room, index) => {
            const {
              roomNumber,
              roomType,
              capacity,
              pricePerNight,
              description,
              amenities,
              images,
              ratings,
            } = room;

            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={index}>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {roomNumber}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {roomType}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {capacity}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {pricePerNight}/night
                  </Typography>
                </td>

                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex items-center gap-x-1"
                  >
                    {ratings} <FaStar className="text-yellow-700" />
                  </Typography>
                </td>

                <td className={`${classes} bg-blue-gray-50/50`}>
                  <RoomDesDialog
                    description={description}
                    amenities={amenities}
                    images={images}
                  />
                </td>

                <td className={`${classes} bg-blue-gray-50/50`}>
                  <div className="space-x-2">
                    <EditRoomDialog roomData={room} onUpdate={refetch} />

                    <IconButton
                      variant="text"
                      className="text-xl"
                      color="red"
                      size="md"
                      onClick={deleteRoom(room._id)}
                    >
                      <FaTrash />
                    </IconButton>
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

export default RoomsTable;
