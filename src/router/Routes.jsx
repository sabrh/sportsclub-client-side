import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Courts from "../pages/Courts";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routes/PrivateRoute"
import Profile from "../pages/dashboardPages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "../routes/AdminRoute";
import Bookings from "../pages/dashboardPages/Bookings"
import Announcements from "../pages/dashboardPages/Announcements"
import PaymentHistory from "../pages/dashboardPages/PaymentHistory"
import ManageBookings from "../pages/dashboardPages/admin/ManageBookings"
import ManageCourts from "../pages/dashboardPages/admin/ManageCourts"
import ManageUsers from "../pages/dashboardPages/admin/ManageMembers"
import Payment from "../pages/Payment";
import AdminHome from "../pages/dashboardPages/admin/AdminHome";
import ManageMembers from "../pages/dashboardPages/admin/ManageMembers";
import ConfirmedBookings from "../pages/dashboardPages/admin/ConfirmedBookings"
import ManageCoupons from "../pages/dashboardPages/admin/ManageCoupons";
import MakeAnnouncements from "../pages/dashboardPages/admin/MakeAnnouncements";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: MainLayouts,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/courts",
        element: <Courts />,
      },
      {
        path: "/payment/:id",
        element: <PrivateRoute><Payment /></PrivateRoute>
      }
      
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      
    ]
  },

 {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "payment-history",
        element: <PrivateRoute><PaymentHistory /></PrivateRoute>,
      },

      {
        path: "admin-home",
        element: <AdminRoute><AdminHome /></AdminRoute>,
      },
      {
        path: "manage-bookings",
        element: <AdminRoute><ManageBookings /></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "manage-courts",
        element: <AdminRoute><ManageCourts /></AdminRoute>,
      },
      {
        path: "manage-members",
        element: <AdminRoute><ManageMembers /></AdminRoute>,
      },
      {
        path: "confirmed-bookings",
        element: <AdminRoute><ConfirmedBookings /></AdminRoute>,
      },
      {
        path: "manage-coupons",
        element: <AdminRoute><ManageCoupons /></AdminRoute>,
      },
      {
        path: "make-announcements",
        element: <AdminRoute><MakeAnnouncements /></AdminRoute>,
      },
    ]
  }
]);