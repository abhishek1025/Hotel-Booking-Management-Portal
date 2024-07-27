import { Card, CardBody, Typography } from '@material-tailwind/react';
import { formatImageUrl } from '../../utils';
import AddToCardBtn from './AddToCardBtn';

const RoomCard = ({ room }) => {
  return (
    <Card className="w-72 bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="relative">
        <div>
          <div className="w-full h-32 overflow-hidden">
            {room.images && room.images.length > 0 ? (
              <img
                src={formatImageUrl(room.images[0])}
                alt={room.roomType}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                No Image Available
              </div>
            )}
          </div>
        </div>
      </div>
      <CardBody className="p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 font-semibold"
        >
          Room Type: {room.roomType}
        </Typography>
        <p className="text-gray-600 mb-2 line-clamp-2">
          Description: {room.description}
        </p>
        <Typography className="text-gray-500 mb-2">
          Capacity: {room.capacity} guests
        </Typography>
        <Typography className="text-lg font-bold">
          Price: ${room.pricePerNight}
        </Typography>

        <AddToCardBtn room={room} />
      </CardBody>
    </Card>
  );
};

export default RoomCard;
