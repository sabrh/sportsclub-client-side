import { Outlet } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <span className="loading loading-spinner loading-xl"></span>;
  
  return (
    <div className="flex">
      <DashboardSidebar user={user} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;