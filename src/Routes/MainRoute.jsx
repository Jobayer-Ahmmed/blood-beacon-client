import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



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
            }
        ]
    }
])

export default router