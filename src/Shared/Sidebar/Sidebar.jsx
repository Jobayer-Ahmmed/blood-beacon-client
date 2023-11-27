import { Link, NavLink } from "react-router-dom"
import {CgProfile} from "react-icons/cg"


const Sidebar = () => {
  return (
    <aside  className="bg-base-300 rounded-lg p-10 text-xl text-gray-600 font-bold">
        <ul>
            <li><NavLink to="/dashboard/profile"><CgProfile className="inline mr-2"/>Profile</NavLink></li>
            <li><NavLink to="/dashboard/create-donation-request">Donation Request</NavLink></li>
            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
            <li><NavLink></NavLink></li>
        </ul>
    </aside>
  )
}

export default Sidebar