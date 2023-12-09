import React, { useContext, useEffect, useState } from "react";
import {FaRegEdit} from "react-icons/fa"
import {TiDeleteOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../ContextApi/MyAuthProvider";
import useAxios from "../../../hooks/useAxios/useAxios";
import useProfile from "../../../hooks/useProfile/useProfile";



const AllDonationRequest = () => {
    const [donationStatus, setDonationStatus] =useState('')
    const [donations, setDonations] = useState([])
    const navigate = useNavigate()
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
    <div className="">
      <div>
        <h1 className="text-3xl text-gray-600 font-medium"> All Donation Request</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
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
                  donations?.slice(0,3).map((donation,id)=><tr key={donation._id}>
                  <th>{id+1} </th>
                  <td>{donation.recipient_name}</td>
                  <td>{donation.upzilas}, {donation.districts}</td>
                  <td>{donation.donation_date}</td>
                  <td>{donation.donation_time}</td>
                  <td>
                    <select name="" id="" className="border p-[2px]" onChange={handleDonationStaus}>
 
                        <option value="Pending" >Pending</option>

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
                  <td><button   onClick={()=>navigate(`/dashboard/donation-requset-details/${donation._id}`)}>Details</button></td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests"  className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">View My All Requests</Link>
          </>
          }
      </div>
    </div>
  );
};

export default AllDonationRequest;
