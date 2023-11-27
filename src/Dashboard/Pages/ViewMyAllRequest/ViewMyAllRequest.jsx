import { useContext, useState } from "react"
import { MyContext } from "../../../ContextApi/MyAuthProvider"
import { FaRegEdit } from "react-icons/fa"
import { TiDeleteOutline } from "react-icons/ti"


        // TO DO : all request
        // TO Do : pagination 

const ViewMyAllRequest = () => {
  const [donationStatus, setDonationStatus] = useState('')  
  const {myUser} = useContext(MyContext) 
  const {displayName, email} = myUser


  const handleDonationStaus=e=>{
    console.log(e.target.value)
    setDonationStatus(e.target.value)
  }

  return (
    <div>
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

      </div>
    </div>
  )
}

export default ViewMyAllRequest