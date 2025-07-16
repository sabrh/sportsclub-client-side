import useAdmin from '../hooks/useAdmin';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const { isAdmin, isAdminLoading, error } = useAdmin();

  if (isAdminLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (error) {
    console.error('Admin check error:', error);
    return <Navigate to="/error" state={{ error }} />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;