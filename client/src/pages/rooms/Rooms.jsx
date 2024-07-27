import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { LandingHeader } from '../../ui/Headings';
import { getRequest } from '../../utils';
import RoomCard from './RoomCard';

const Rooms = () => {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/rooms',
      });

      return res.data || [];
    },
  });

  if (isLoading) {
    return (
      <Typography variant="h4" className="text-center">
        Loading ....
      </Typography>
    );
  }

  if (error) return <div>Error loading rooms...</div>;

  return (
    <div className="px-4 pb-8">
      <LandingHeader>Our Rooms</LandingHeader>
      <br />
      <br />
      <div className="grid grid-cols-3 w-[80%] mx-auto gap-x-6 gap-y-10">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
