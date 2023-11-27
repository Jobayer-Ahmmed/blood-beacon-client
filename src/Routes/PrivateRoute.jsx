import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import { MyContext } from "../ContextApi/MyAuthProvider";



const PrivateRoute = ({children}) => {
    const {myUser, loading} = useContext(MyContext)
    const location = useLocation()
    console.log(location)

    if(loading)
    return <span className="loading loading-bars loading-lg"></span>

    if(myUser)
        return children


  return <Navigate state={location.pathname} to="/login"></Navigate>
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
}

export default PrivateRoute