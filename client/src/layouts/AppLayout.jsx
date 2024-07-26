import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <div>
      <div className="fixed z-50 top-0 w-full">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
