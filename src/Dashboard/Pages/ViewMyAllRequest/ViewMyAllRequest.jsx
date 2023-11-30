
import { MyContext } from "../../../ContextApi/MyAuthProvider"
import { FaRegEdit } from "react-icons/fa"
import { TiDeleteOutline } from "react-icons/ti"
import useProfile from "../../../hooks/useProfile/useProfile"
import React, { useContext, useEffect, useState } from "react";
// import {FaRegEdit} from "react-icons/fa"
// import {TiDeleteOutline} from "react-icons/ti"
import {  useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios/useAxios";


        // TO DO : all request
        // TO Do : pagination 

const ViewMyAllRequest = () => {
  const [donationStatus, setDonationStatus] =useState('')
  const [donations, setDonations] = useState([])
  const navigate = useNavigate()
  // const donations = useGetDonation()
  const myAxios = useAxios()
  const {myUser} = useContext(MyContext) 
  const {displayName, email} = myUser
  const type = useProfile()
  const user_type = type?.user_type



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
    <div>
    {
      user_type==="donor" &&
   
      <div>
        <h1 className="text-3xl text-gray-600 font-medium">My All Donation Requests</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
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
                    <select name="" id="" className="border p-[2px]" onChange={handleDonationStaus}>
 
                        <option value="Pending" className={(donationStatus==="Inprogess" || donationStatus==="Done" || donationStatus==="Cancel") && "hidden"}>Pending</option>
                        <option value="Inprogess">Inprogess</option>
                        {
                          donationStatus==="Inprogess" ? <>                          
                            <option value="Done">Done</option>
                            <option value="Cancel">Cancel</option>
                          </>:''
                        }
                        {/* {
                          (donationStatus==="Done" || donationStatus==="Cancel")  && <>                          
                            <option value="Done">Done</option>
                            <option value="Cancel">Cancel</option>
                          </>
                        } */}
                        

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

      </div>
    }
    </div>
  )
}

export default ViewMyAllRequest