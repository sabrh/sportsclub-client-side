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
        path: "/dashboard",
        element: <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
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
  }
]);