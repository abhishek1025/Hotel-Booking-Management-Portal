import { Typography } from '@material-tailwind/react';
import Chart from 'react-apexcharts';

const BarGraphChart = ({ data }) => {
  return (
    <div>
      <Typography variant="h6">Staff Distribution By Position</Typography>
      <div>
        <Chart
          type="bar"
          series={[
            {
              name: 'Staff Count',
              data: data.map((staff) => staff.count),
            },
          ]}
          options={{
            xaxis: {
              categories: data.map((staff) => staff.role),
            },

            yaxis: {
              title: {
                text: 'Staff Count',
              },
            },

            colors: ['#4CAF50'],
          }}
        />
      </div>
    </div>
  );
};

export default BarGraphChart;
