import {  Link, NavLink } from "react-router-dom"
import {CgProfile} from "react-icons/cg"
import useProfile from "../../hooks/useProfile/useProfile"


const Sidebar = () => {
  const type = useProfile()
  const user_type = type?.user_type

  return (
    <aside  className="bg-red-300 rounded-lg p-10 text-xl text-gray-600 font-bold">
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          {
            user_type=== "donor" && <>
              <li><NavLink to="/dashboard/profile"><CgProfile className="inline mr-2"/>Profile</NavLink></li>
              <li><NavLink to="/dashboard/create-donation-request">Donation Request</NavLink></li>
            </>
          }
          {
            user_type=== "admin" && <>
              <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
              <li><NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Request</NavLink></li>
              <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
              <li><NavLink to="/dashboard/draft">Draft</NavLink></li>
            </>
          }

            
            
            


            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
        </ul>
        <Link to="/" className="btn btn-outline text-lg px-6 mt-20">Home</Link>
    </aside>
  )
}

export default Sidebar