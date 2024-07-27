import { useQuery } from '@tanstack/react-query';
import { Typography, IconButton } from '@material-tailwind/react';
import { getRequest } from '../../utils/apiHandler';
import { FaStar } from 'react-icons/fa';

const FeedbackTable = () => {
  const { data: feedbacks, isLoading } = useQuery({
    queryFn: async () => {
      const res = await getRequest({ endpoint: '/feedbacks' });
      return res?.data || [];
    },
    queryKey: ['feedbacks'],
  });

  const TABLE_HEAD = ['Room', 'Rating', 'Comment', 'Date'];

  if (isLoading) {
    return <Typography variant="h4">Loading ....</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" className="mb-10">
        Feedbacks
      </Typography>

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
          {feedbacks.map((feedback, index) => {
            const { room, rating, comment, createdAt } = feedback;
            const isLast = index === feedbacks.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={index}>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {room.roomNumber}{' '}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center gap-x-2"
                  >
                    {rating} <FaStar className="text-yellow-700" />
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {comment}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {new Date(createdAt).toLocaleDateString()}{' '}
                    {/* Format date as needed */}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
