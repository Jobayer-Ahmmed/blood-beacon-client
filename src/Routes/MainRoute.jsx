import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Profile from "../Dashboard/Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";
import ViewMyAllRequest from "../Dashboard/Pages/ViewMyAllRequest/ViewMyAllRequest";
import CreateDonationRequest from "../Dashboard/Pages/CreateDonationRequest/CreateDonationRequest";





const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute> ,
        children:[
            {
                path:"/dashboard",
                element:<Dashboard/>,

            },
                    
            {
                path:"/dashboard/profile",
                element:<PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path:"/dashboard/my-donation-requests",
                element:<ViewMyAllRequest/>
            },
            {
                path:"/dashboard/create-donation-request",
                element:<CreateDonationRequest/>
            }

        ]
    }
])

export default router