import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
