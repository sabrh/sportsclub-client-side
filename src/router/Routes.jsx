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
import ManageCourts from "../pages/dashboardPages/admin/ManageCourts"
import Payment from "../pages/Payment";
import AdminHome from "../pages/dashboardPages/admin/AdminHome";
import ManageMembers from "../pages/dashboardPages/admin/ManageMembers";
import ManageCoupons from "../pages/dashboardPages/admin/ManageCoupons";
import MakeAnnouncements from "../pages/dashboardPages/admin/MakeAnnouncement";
import ManageBookings from "../pages/dashboardPages/admin/ManageBookings";
import AllUsers from "../pages/dashboardPages/admin/AllUsers";

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
        path: "payment/:id",
        element: <Payment />,
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
        path: "manage-courts",
        element: <ManageCourts />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "manage-coupons",
        element: <AdminRoute><ManageCoupons /></AdminRoute>,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncements />,
      },
    ]
  }
]);