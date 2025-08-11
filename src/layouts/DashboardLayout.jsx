import { Outlet, NavLink } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="flex">
        <DashboardSidebar user={user} />
        <div className="flex-1 p-6">
          {loading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;