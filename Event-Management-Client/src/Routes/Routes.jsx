import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageUsers from "../Pages/dashboard/admin/ManageUsers";
import AddData from "../Pages/dashboard/organizer/AddData";
import MyData from "../Pages/dashboard/organizer/MyData";
import ManageData from "../Pages/dashboard/admin/ManageData";
import SelectedData from "../Pages/dashboard/user/SelectedData";
import Payment from "../Pages/dashboard/user/Payment";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // // user dashboard
      // {
      //   path: "/selectedData",
      //   element: (
      //     <PrivateRoute>
      //       <SelectedData />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/payment",
      //   element: (
      //     <PrivateRoute>
      //       <Payment />
      //     </PrivateRoute>
      //   ),
      // },

      // // admin dashboard
      // {
      //   path: "/manageusers",
      //   element: (
      //     <PrivateRoute>
      //       <ManageUsers />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/manageData",
      //   element: (
      //     <PrivateRoute>
      //       <ManageData />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/addData",
      //   element: (
      //     <PrivateRoute>
      //       <AddData />
      //     </PrivateRoute>
      //   ),
      // },

      // // organizer dashboard
      // {
      //   path: "/myData",
      //   element: (
      //     <PrivateRoute>
      //       <MyData />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard/mybookings', element: <SelectedData /> },
      { path: '/dashboard/payment', element: <Payment /> },
      { path: '/dashboard/manageusers', element: <ManageUsers /> },
      { path: '/dashboard/manageData', element: <ManageData /> },
      { path: '/dashboard/addData', element: <AddData /> },
      { path: '/dashboard/myData', element: <MyData /> },
    ],
  },
]);
