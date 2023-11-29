import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import {FaRegEdit} from "react-icons/fa"
import {TiDeleteOutline} from "react-icons/ti"
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile/useProfile";
import AdminFeatureCard from "../AdminFeatureCard/AdminFeatureCard";
import useAxios from "../../hooks/useAxios/useAxios";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

const Dashboard = () => {
  const [donationStatus, setDonationStatus] =useState('')
  const [donations, setDonations] = useState([])
  const navigate = useNavigate()
  // const donations = useGetDonation()
  const myAxios = useAxios()
  const {myUser} = useContext(MyContext) 
  const {displayName, email} = myUser
  const type = useProfile()
  const user_type = type?.user_type




  // const handleDonationStaus=e=>{
  //   console.log(e.target.value)
  //   setDonationStatus(e.target.value)
  // }

  const handleDonationStaus = React.useCallback((e) => {
    console.log(e.target.value);
    setDonationStatus(e.target.value);
  }, []);

  const donationDataByEmail=()=>{
    myAxios.get(`/donation/${email}`)
    .then(res=>{
      setDonations(res.data)
    })
  }

  // const handleEdit=(id)=>{
  //   myAxios.put(`/donation/${id}`)
  //   .then(()=>toast.success("Request has been updated"))
  // }

  useEffect(()=>{
    donationDataByEmail()
  },[])
  
  const handleDelete= (id)=>{
    myAxios.delete(`/donation/${id}`)
    .then(()=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          donationDataByEmail()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    })
  }
 

  return (
    <div className="p-10">
      <Helmet>
        <title>BloodBeacon | DashBord</title>
      </Helmet>
      {/* dynamic name */}
      <h1 className="text-4xl font-medium text-gray-600">Welcome, {displayName}</h1>
      {
        user_type==="donor" &&

      <div>
        <div>
          <h3 className="text-2xl text-gray-600 mt-3">
            You have <span className="font-bold">{donations.length}</span> blood donate requset
          </h3>
          {
            donations?.length>0 && <>
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
                {
                  donations?.map((donation,id)=><tr key={donation._id}>
                  <th>{id+1} </th>
                  <td>{donation.recipient_name}</td>
                  <td>{donation.upzilas}, {donation.districts}</td>
                  <td>{donation.donation_date}</td>
                  <td>{donation.donation_time}</td>
                  <td>
                    <select name="" id="" className="border p-[2px]" onBlur={handleDonationStaus}>
                      {
                        donationStatus === "Pending" && <>
                          <option value="Pending">Pending</option>
                          <option value="Inprogess">Inprogess</option>
                        </>
                      }
                      
                      
                      {
                        donationStatus === "Inprogess" ? <>
                        <option value="Done">Done</option>
                        <option value="Cancel">Cancel</option>
                        </> : <></>

                        
                      }
                    </select>
                  </td>
                  <td>
                    <p>{displayName}</p>
                    <p>{email}</p>
                  </td>
                  <td><button className="text-xl font-bold" onClick={()=>navigate(`/dashboard/edit-request/${donation._id}`)}><FaRegEdit/></button></td>
                  <td><button className="text-3xl font-bold text-red-600" onClick={()=>handleDelete(donation._id)}><TiDeleteOutline/></button></td>
                  <td><button>Details</button></td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests"  className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">View My All Request</Link>
          </>
          }
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


