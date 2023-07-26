import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageUsers from "../Pages/dashboard/admin/ManageUsers";
import AddData from "../Pages/dashboard/organizer/AddData";
import MyData from "../Pages/dashboard/organizer/MyData";
import ManageData from "../Pages/dashboard/admin/ManageData";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: '/manageusers',
                element: <ManageUsers />
            },
            {
                path: '/manageData',
                element: <ManageData />
            },
            {
                path: '/addData',
                element: <AddData />
            },
            {
                path: '/myData',
                element: <MyData />
            }
        ]
    },
]);
