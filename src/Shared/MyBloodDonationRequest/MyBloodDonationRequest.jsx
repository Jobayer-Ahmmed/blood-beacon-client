import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../ContextApi/MyAuthProvider"
import useAxios from "../../hooks/useAxios/useAxios"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import { TiDeleteOutline } from "react-icons/ti"

const MyBloodDonationRequest = () => {
    const [donations, setDonations] = useState([])
    const [donationStatus, setDonationStatus] =useState('')

    const navigate = useNavigate()
    const myAxios = useAxios()
    const {myUser} = useContext(MyContext) 
    const {displayName, email} = myUser
    


  const handleDonationStatus =(e, id) => {
    console.log(id)
    console.log(e.target.value);
    setDonationStatus(e.target.value);

    myAxios.put(`/donation_status/${id}`, {
      donation_status:e.target.value
    })
    .then(res=>console.log(res.data))
  }

  const donationDataByEmail=()=>{
    myAxios.get(`/donation/${email}`)
    .then(res=>{
      setDonations(res.data)
    })
  }

 

  useEffect(()=>{
    donationDataByEmail()
  },[donationDataByEmail])
  

  const handleDelete= (id)=>{
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
            myAxios.delete(`/donation/${id}`)
            .then(()=>{
                donationDataByEmail()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
            })             
        }
      });

  }

  return (
    <div className="w-full px-5">
        <div>
        <h1 className="text-3xl text-gray-600 font-medium">My Blood Donation Request</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        {
            donations?.length>0 ? <>
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
                                      
                    <select  onChange={(e)=>handleDonationStatus(e, donation._id)} className={donation.donation_status==="Done" || donation.donation_status==="Cancel" ?"invisible":"border p-[2px] "}>

                    {
                      (donation.donation_status==="Pending") ?<>
                      <option value="Pending">Pending</option>
                      <option value="Inprogess">Inprogess</option>
                      </>:(donation.donation_status==="Inprogess") && <>
                      <option value="Inprogess">Inprogess</option>
                      <option value="Done">Done</option>
                       <option value="Cancel">Cancel</option>
                      </>
                      
                      
                    }
                        
                        

                    </select>
                  </td>
                  <td>
                    <p>{displayName}</p>
                    <p>{email}</p>
                  </td>
                  <td><button className="text-xl font-bold" onClick={()=>navigate(`/dashboard/edit-request/${donation._id}`)}><FaRegEdit/></button></td>
                  <td><button className="text-3xl font-bold text-red-600" onClick={()=>handleDelete(donation._id)}><TiDeleteOutline/></button></td>
                  <td><button onClick={()=>navigate(`/dashboard/donation-requset-details/${donation._id}`)}>Details</button></td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests"  className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">View My All Requests</Link>
          </>: 
          <h1 className="text-xl text-gray-600 font-medium text-center">You don&apos;t create any donation request</h1>
          }
        </div>
    </div>
  )
}

export default MyBloodDonationRequest