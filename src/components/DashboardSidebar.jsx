import { NavLink } from 'react-router';
import { FaHome, FaUser, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaHistory, FaUsersCog, FaClipboardList } from 'react-icons/fa';

const DashboardSidebar = ({ user }) => {
  const commonLinks = (
    <>
      <li>
        <NavLink to="/dashboard" end className="flex items-center gap-2">
          <FaHome /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className="flex items-center gap-2">
          <FaUser /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/bookings" className="flex items-center gap-2">
          <FaCalendarAlt /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/announcements" className="flex items-center gap-2">
          <FaBullhorn /> Announcements
        </NavLink>
      </li>
    </>
  );

  const memberLinks = (
    <>
      <li>
        <NavLink to="/dashboard/payment-history" className="flex items-center gap-2">
          <FaMoneyBillWave /> Payment History
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-bookings" className="flex items-center gap-2">
          <FaClipboardList /> Manage Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-users" className="flex items-center gap-2">
          <FaUsersCog /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-courts" className="flex items-center gap-2">
          <FaClipboardList /> Manage Courts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-400">{user?.displayName || user?.email}</p>
      </div>
      <ul className="space-y-2">
        {commonLinks}
        {user?.role === 'member' && memberLinks}
        {user?.role === 'admin' && adminLinks}
      </ul>
    </div>
  );
};

export default DashboardSidebar;