import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import { MyContext } from "../ContextApi/MyAuthProvider";
import LoadingPage from "../Shared/LoadingPage/LoadingPage";



const PrivateRoute = ({children}) => {
    const {myUser, loading} = useContext(MyContext)
    const location = useLocation()
    // console.log(location)

    if(loading)
    return <LoadingPage/>

    if(myUser)
        return children


  return <Navigate state={location.pathname} to="/login"></Navigate>
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
}

export default PrivateRoute