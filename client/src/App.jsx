import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import AppLayout from './layouts/AppLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Booking from './pages/Booking';
import FeedbackTable from './pages/dashboard/FeedbackTable';
import MenuItemsTable from './pages/dashboard/menu/MenuTables';
import RoomsTable from './pages/dashboard/rooms/RoomsTable';
import StaffTable from './pages/dashboard/staff/StaffTable';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import Rooms from './pages/Rooms';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/Cart';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/booking/:roomId" element={<Booking />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<RoomsTable />}></Route>
          <Route path="menu-items" element={<MenuItemsTable />}></Route>
          <Route path="staffs" element={<StaffTable />}></Route>
          <Route path="feedbacks" element={<FeedbackTable />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
