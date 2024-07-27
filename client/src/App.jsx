import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import AppLayout from './layouts/AppLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Cart from './pages/cart/Cart';
import BookingTable from './pages/dashboard/bookings/BookingsTable';
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackTable from './pages/dashboard/FeedbackTable';
import MenuItemsTable from './pages/dashboard/menu/MenuTables';
import RoomsTable from './pages/dashboard/rooms/RoomsTable';
import StaffTable from './pages/dashboard/staff/StaffTable';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import Rooms from './pages/rooms/Rooms';
import UserBookingTable from './pages/user-bookings/UserBookingTable';
import UserBookingHistory from './pages/user-bookings/UserBookingHistory';
import UserFeedbackForm from './pages/user-bookings/UserFeedbackForm';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bookings" element={<UserBookingTable />} />
          <Route path="/booking-history" element={<UserBookingHistory />} />
          <Route path="/feedbacks" element={<UserFeedbackForm />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<RoomsTable />}></Route>
          <Route path="menu-items" element={<MenuItemsTable />}></Route>
          <Route path="staffs" element={<StaffTable />}></Route>
          <Route path="feedbacks" element={<FeedbackTable />}></Route>
          <Route path="bookings" element={<BookingTable />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
