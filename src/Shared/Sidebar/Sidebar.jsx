import {  Link, NavLink } from "react-router-dom"
import {CgProfile} from "react-icons/cg"
import useProfile from "../../hooks/useProfile/useProfile"
import { MdDashboard } from "react-icons/md"
import { AiOutlinePullRequest } from "react-icons/ai"
import { FaUsers } from "react-icons/fa"
import { RiRefund2Fill } from "react-icons/ri"
import { MdBloodtype } from "react-icons/md"
import { BiSolidBookContent } from "react-icons/bi"
import { FaFirstdraft } from "react-icons/fa"
import { MdOutlineBloodtype } from "react-icons/md"


const Sidebar = () => {
  const type = useProfile()
  const user_type = type?.user_type

  return (
    <aside  className="full lg:w-96 bg-red-300 rounded-lg  py-10 px-5 text-xl text-gray-600 font-bold">
        <ul>
          <li><NavLink to="/dashboard"><MdDashboard className="inline mr-2 text-black"/>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/profile"><CgProfile className="inline mr-2 text-black"/>Profile</NavLink></li>
          <li><NavLink to="/dashboard/create-donation-request"><AiOutlinePullRequest className="inline mr-2 text-black"/>Create Donation Request</NavLink></li>


          {
            user_type=== "Volunteer" && <>
            <li><NavLink to="/dashboard/my-blood-donation-request"><MdOutlineBloodtype  className="inline mr-2 text-black"/>My Blood Donation Request</NavLink></li>
            <li><NavLink to="/dashboard/all-blood-donation-request"><MdBloodtype  className="inline mr-2 text-black"/>All Blood Donation Request</NavLink></li>
            </>
          }
          {
            user_type=== "Admin" && <>
              <li><NavLink to="/dashboard/all-users"><FaUsers  className="inline mr-2 text-black"/>All Users</NavLink></li>
              <li><NavLink to="/dashboard/my-blood-donation-request"><MdOutlineBloodtype  className="inline mr-2 text-black"/>My Blood Donation Request</NavLink></li>
              <li><NavLink to="/dashboard/all-blood-donation-request"><MdBloodtype  className="inline mr-2 text-black"/>All Blood Donation Request</NavLink></li>
              <li><NavLink to="/dashboard/content-management"><BiSolidBookContent className="inline mr-2 text-black"/>Content Management</NavLink></li>
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