import { Card, CardBody, Typography } from '@material-tailwind/react';
import { PrimaryButton } from '../ui/buttons/Buttons';
import { Link } from 'react-router-dom';
import { LandingHeader } from '../ui/Headings';
import { FaHeart } from 'react-icons/fa';

const RoomCard = ({ image, title, price, desc }) => {
  return (
    <Card className="w-96 relative">
      <div className="absolute top-3 right-3 bg-white p-2 rounded-full">
        <FaHeart
          title="Favorites"
          className="text-xl cursor-pointer text-red-400"
        />
      </div>
      <img src={image} alt="card-image" />
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>{' '}
        <p color="blue-gray" className="mb-2">
          {desc}
        </p>
        <Typography>Price: ${price}</Typography>
        <PrimaryButton className="mt-4">
          <Link to={`/booking/:id`}>Book now</Link>
        </PrimaryButton>
      </CardBody>
    </Card>
  );
};

const Rooms = () => {
  const rooms = [
    {
      image: '/images/room1.jpg',
      title: 'Double Room 5',
      desc: 'Awesome Double Room 5 and is suitable for everyone',
      price: 330.0,
    },
    {
      image: '/images/room2.jpg',
      title: 'Family Room 3',
      price: 165.0,
      desc: 'Awesome Family Room 3 and is suitable for every family members',
    },
    {
      image: '/images/room3.jpg',
      title: 'Luxury Room 3',
      desc: 'Awesome Luxury Room 3, expensive but worth the price, comfy bed and sofa!',

      price: 440.0,
    },
  ];

  return (
    <div className="mt-[110px]">
      <LandingHeader>Our Rooms</LandingHeader>
      <br />
      <div className="flex flex-wrap gap-20 justify-center ">
        {rooms.map((room, index) => (
          <RoomCard
            key={index}
            image={room.image}
            title={room.title}
            price={room.price}
            desc={room.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
