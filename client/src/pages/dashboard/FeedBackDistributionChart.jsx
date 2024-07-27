import { Typography } from '@material-tailwind/react';
import Chart from 'react-apexcharts';

const FeedBackDistributionChart = ({ data }) => {
  return (
    <div>
      <Typography variant="h6" className='text-center'>Ratings Per Room</Typography>

      <div className="mt-8">
        <Chart
          type="donut"
          series={[...data.map(({ ratings }) => ratings)]}
          options={{
            labels: [...data.map(({ roomNumber }) => `Room ${roomNumber}`)],
            legend: {
              show: true,
              position: 'bottom',
            },
          }}
        />
      </div>
    </div>
  );
};

export default FeedBackDistributionChart;
