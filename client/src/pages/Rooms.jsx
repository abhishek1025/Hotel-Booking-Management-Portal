import { Card, CardBody, Typography } from '@material-tailwind/react';
import { PrimaryButton } from '../ui/buttons/Buttons';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../ui/Headings';
import { FaHeart } from 'react-icons/fa';
import { getRequest, postRequest } from '../utils/apiHandler';
import { useEffect, useState } from 'react';
import { formatImageUrl } from '../utils';

const RoomCard = ({ room }) => {
  const [isCart, setIsCart] = useState(false);

  const handleAddToCart = async () => {
    const response = await postRequest({
      endpoint: '/bookings/cart',
      data: {
        room: room._id,
        pricePerNight: room.pricePerNight,
      },
    });

    if (response.ok) {
      setIsCart(true);
      console.log('Room added to favorites/cart:', response.data);
    }
  };
  return (
    <Card className="w-80 bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="relative">
        {/* Display images in a carousel or list */}
        <div className="relative">
          <div className="w-full h-40 overflow-hidden">
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
          <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
            <FaHeart
              title={isCart ? 'Remove from Favorites' : 'Add to Favorites'}
              className={`text-xl cursor-pointer ${
                isCart ? 'text-red-500' : 'text-gray-500'
              }`}
              onClick={handleAddToCart}
            />
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
        <p className="text-gray-600 mb-2">Description:{room.description}</p>
        <Typography className="text-gray-500 mb-2">
          Capacity: {room.capacity} guests
        </Typography>
        <Typography className="text-lg font-bold">
          Price: ${room.pricePerNight}
        </Typography>
        <PrimaryButton className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
          <Link to={`/booking/${room._id}`}>Book now</Link>
        </PrimaryButton>
      </CardBody>
    </Card>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const getAllRooms = async () => {
    const res = await getRequest({
      endpoint: '/rooms',
    });

    if (res.ok) {
      setRooms(res.data);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div className="mt-[110px] px-4">
      <LandingHeader>Our Rooms</LandingHeader>
      <br />
      <div className="grid grid-cols-3 ">
        <div className="w-[80%] mx-auto">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
