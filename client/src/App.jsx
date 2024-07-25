import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <>
      <div className="fixed z-50 top-0 w-full">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking/:roomId" element={<Booking />} />
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
