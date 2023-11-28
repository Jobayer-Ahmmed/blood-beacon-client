import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import {FaRegEdit} from "react-icons/fa"
import {TiDeleteOutline} from "react-icons/ti"
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile/useProfile";
import AdminFeatureCard from "../AdminFeatureCard/AdminFeatureCard";

const Dashboard = () => {
  const [donationStatus, setDonationStatus] = useState('')  
  const {myUser} = useContext(MyContext) 
  const {displayName, email} = myUser
  const type = useProfile()
  const user_type = type?.user_type

  console.log(user_type)


  const handleDonationStaus=e=>{
    console.log(e.target.value)
    setDonationStatus(e.target.value)
  }
 

  return (
    <div className="p-10">
      <Helmet>
        <title>BloodBeacon | DashBord</title>
      </Helmet>
      {/* dynamic name */}
      <h1 className="text-4xl font-medium text-gray-600">Welcome,{displayName}</h1>
      {
        user_type==="donor" &&

      <div>
        <div>
          <h3 className="text-2xl text-gray-600 mt-3">
            You have <span className="font-bold">5</span> blood donate requset
          </h3>
          <div className="overflow-x-auto my-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Donor Information</th>
                  <th>Edit</th>
                  <th>Delete Request</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Raju</td>
                  <td>Savar, Dhaka</td>
                  <td>11/12/2023</td>
                  <td>10:00 am</td>
                  <td>
                    <select name="" id="" className="border p-[2px]" onChange={handleDonationStaus}>
                      <option value="Pending">Pending</option>
                      <option value="Inprogess">Inprogess</option>
                      <option value="Done">Done</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                  <td>
                    <p>{displayName}</p>
                    <p>{email}</p>
                  </td>
                  <td><button className="text-xl font-bold"><FaRegEdit/></button></td>
                  <td><button className="text-3xl font-bold text-red-600"><TiDeleteOutline/></button></td>
                  <td><button>Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests"  className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">View My All Request</Link>
        </div>
      </div>
      }

      {
        user_type==="admin" && <>
          <AdminFeatureCard/>
        </>
      }
    </div>
  );
};

export default Dashboard;
