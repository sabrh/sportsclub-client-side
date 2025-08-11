import { NavLink } from 'react-router';
import { FaHome, FaUser, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaHistory, FaUsersCog, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';
import { BiSpeaker, BiUser } from 'react-icons/bi';
import { BsPlay } from 'react-icons/bs';
import logoImg from '../assets/logo.png';


const DashboardSidebar = ({ user }) => {
  const commonLinks = (
    <>
      <li>
        <NavLink to="" end className="flex items-center gap-2">
          <FaHome /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="profile" className="flex items-center gap-2">
          <FaUser /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="bookings" className="flex items-center gap-2">
          <FaCalendarAlt /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/announcements" className="flex items-center gap-2">
          <FaBullhorn /> Announcements
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-bookings" className="flex items-center gap-2">
          <MdPending /> Manage Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-members" className="flex items-center gap-2">
          <GrGroup /> Manage Members
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-users" className="flex items-center gap-2">
          <BiUser /> All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-courts" className="flex items-center gap-2">
          <BsPlay /> Manage Courts
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/make-announcement" className="flex items-center gap-2">
          <BiSpeaker /> Make Announcement
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history" className="flex items-center gap-2">
          <FaMoneyBillWave /> Payment History
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
    <div className="w-64 bg-[#001C32] text-white min-h-screen p-4">
      <div className='navbar-start'>
      <NavLink to='/' className="flex items-center text-white font-extrabold text-2xl gap-x-1"><img src={logoImg} className="w-20" alt='logo' />SportsClub</NavLink>
      </div>
      
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