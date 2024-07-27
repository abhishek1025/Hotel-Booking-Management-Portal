import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Card, CardBody } from '@material-tailwind/react';

const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Body */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="p-5 h-full w-full">
          <Card className="text-black border h-full w-full overflow-scroll">
            <CardBody>
              <Outlet />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
