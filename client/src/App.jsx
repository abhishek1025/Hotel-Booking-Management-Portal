import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import AppLayout from './layouts/AppLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Booking from './pages/Booking';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import Rooms from './pages/Rooms';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking/:roomId" element={<Booking />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<div>Dashboard</div>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
