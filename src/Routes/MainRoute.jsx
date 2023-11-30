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
import AllUsers from "../Dashboard/Pages/AllUsers/AllUsers";
import CreateDonationRequest from "../Shared/CreateDonationRequest/CreateDonationRequest";
import ContentManagement from "../Dashboard/Pages/ContentMangement/ContentManagement";
import AddBlog from "../Dashboard/AddBlog/AddBlog";
import ProfileEdit from "../Dashboard/Pages/ProfileEdit/ProfileEdit";
import EditRequest from "../Dashboard/EditRequest/EditRequest";
import axios from "axios";
import server_url from "../URL/URL";
import BlogCard from "../Dashboard/BlogCard/BlogCard";
import Fundings from "../Pages/Home/Home/Fundings/Fundings";







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
            },
            {
                path:"/blog",
                element:<BlogCard/>
            },
            {
                path:"/fundings",
                element:<Fundings/>
            },
            {
                path:"/donation_request",
                element:<CreateDonationRequest/>
            }


        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><DashboardLayout/></PrivateRoute> ,
        children:[
            {
                path:"/dashboard",
                element:<PrivateRoute><Dashboard/></PrivateRoute>,

            },
                    
            {
                path:"/dashboard/profile",
                element:<PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path:"/dashboard/my-donation-requests",
                element:<PrivateRoute><ViewMyAllRequest/></PrivateRoute>
            },
            {
                path:"/dashboard/create-donation-request",
                element:<PrivateRoute><CreateDonationRequest/></PrivateRoute>
            },
            {
                path:"/dashboard/all-users",
                element:<PrivateRoute><AllUsers/></PrivateRoute>
            },
            {
                path:"/dashboard/all-blood-donation-request",
                element:<PrivateRoute><CreateDonationRequest/></PrivateRoute>
            },
            {
                path:"/dashboard/content-management",
                element:<PrivateRoute><ContentManagement/></PrivateRoute>
            },
            {
                path:"/dashboard/content-management/add-blog",
                element:<PrivateRoute><AddBlog/></PrivateRoute>
            },
            {
                path:"/dashboard/profile-edit",
                element:<PrivateRoute><ProfileEdit/></PrivateRoute>
            },
            {
                path:"/dashboard/edit-request/:id",
                element:<PrivateRoute><EditRequest/></PrivateRoute>,
                loader: async({params})=>axios.get(`${server_url}/dashboard/edit-request/${params.id}`)
            },


        ]
    }
])

export default router