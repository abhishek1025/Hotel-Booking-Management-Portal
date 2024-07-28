import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../utils';

const ProtectRoutes = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      toast.warning('You need to login to access this page.', {
        theme: 'dark',
      });
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoutes;
