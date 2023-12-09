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
import AllUsers from "../Dashboard/Pages/AllUsers/AllUsers";
import CreateDonationRequest from "../Shared/CreateDonationRequest/CreateDonationRequest";
import ContentManagement from "../Dashboard/Pages/ContentMangement/ContentManagement";
import AddBlog from "../Dashboard/AddBlog/AddBlog";
import ProfileEdit from "../Dashboard/Pages/ProfileEdit/ProfileEdit";
import EditRequest from "../Dashboard/EditRequest/EditRequest";
import axios from "axios";
import server_url from "../URL/URL";
import Fundings from "../Pages/Home/Home/Fundings/Fundings";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import Blog from "../Pages/Blog/Blog";
import BlogEdit from "../Dashboard/Pages/BlogEdit/BlogEdit";
import BlogRead from "../Dashboard/Pages/BlogRead/BlogRead";
import AllUsersDonationRequest from "../Dashboard/Pages/AllUsersDonationRequest/AllUsersDonationRequest";
import MyBloodDonationRequest from "../Shared/MyBloodDonationRequest/MyBloodDonationRequest";
import DonationRequestDetails from "../Shared/DonationRequestDetails/DonationRequestDetails";
import ViewMyAllRequest from "../Dashboard/Pages/ViewMyAllRequest/ViewMyAllRequest";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";







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
                element:<Blog/>
            },
            {
                path:"/fundings",
                element:<Fundings/>
            },
            {
                path:"/search-donor",
                element:<SearchDonor/>
            },
            {
                path:"/donation_request",
                element:<PrivateRoute><DonationRequest/></PrivateRoute>
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
                element:<PrivateRoute><AllUsersDonationRequest/></PrivateRoute>
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
            {
                path:"/dashboard/blog/edit/:id",
                element:<PrivateRoute><BlogEdit/></PrivateRoute>,
                loader: async({params})=>axios.get(`${server_url}/dashboard/blog/edit/${params.id}`)
            },
            {
                path:`/dashboard/blog/read/:id`,
                element: <BlogRead/>,
                loader: async({params})=>axios.get(`${server_url}/dashboard/blog/read/${params.id}`)

            },
            {
                path:"/dashboard/my-blood-donation-request",
                element:<PrivateRoute><MyBloodDonationRequest/></PrivateRoute>
            },
            {
                path:"/dashboard/donation-requset-details/:id",
                element:<PrivateRoute><DonationRequestDetails/></PrivateRoute>,
                loader: async({params})=>axios.get(`${server_url}/dashboard/donation-requset-details/${params.id}`)
            }


        ]
    }
])

export default router