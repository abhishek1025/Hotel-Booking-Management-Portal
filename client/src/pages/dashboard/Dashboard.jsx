import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';

import {
  FaBed,
  FaClipboardList,
  FaComments,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa';
import { getRequest } from '../../utils/apiHandler';
import BarGraphChart from './BarGraph';
import FeedBackDistributionChart from './FeedBackDistributionChart';

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/dashboard-data',
      });

      return res.data || {};
    },
  });

  // Define a mapping of labels to their corresponding icons and titles
  const labelMappings = {
    rooms: {
      icon: <FaBed className="text-xl" />,
      title: 'Rooms',
    },
    bookings: {
      icon: <FaClipboardList className="text-xl" />,
      title: 'Bookings',
    },
    staff: {
      icon: <FaUsers className="text-xl" />,
      title: 'Staff',
    },
    menuItems: {
      icon: <FaUtensils className="text-xl" />,
      title: 'Menu Items',
    },
    feedbacks: {
      icon: <FaComments className="text-xl" />,
      title: 'Feedbacks',
    },
  };

  if (isLoading) {
    return <Typography variant="h4">Loading ....</Typography>;
  }

  return (
    <div>
      <div className="flex justify-between">
        {dashboardData?.overviewData &&
          Object.entries(dashboardData.overviewData).map(
            ([key, value], index) => (
              <div
                key={index}
                className="bg-white border rounded-lg py-4 px-2 flex items-center w-[17%] gap-x-4"
              >
                <div className="bg-blue-600 p-3 rounded-full text-white">
                  {labelMappings[key].icon}
                </div>
                <div className="">
                  <p className="font-bold">{labelMappings[key].title}</p>
                  <p className="text-sm">{String(value).padStart(3, '0')}</p>
                </div>
              </div>
            )
          )}
      </div>

      <div className="pt-8 flex mt-5">
        <div className="w-[60%]">
          {dashboardData.staffDistribution && (
            <BarGraphChart data={dashboardData.staffDistribution} />
          )}
        </div>

        <div className="flex-1">
          {dashboardData.feedbackDistribution && (
            <FeedBackDistributionChart
              data={dashboardData.feedbackDistribution}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
