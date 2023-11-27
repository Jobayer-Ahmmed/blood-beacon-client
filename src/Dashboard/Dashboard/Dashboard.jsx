import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [donationStatus, setDonationStatus] = useState('')   

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
      <h1 className="text-4xl font-medium text-gray-600">Welcome, Jobayer</h1>
      <div>
        <div>
          <h3 className="text-2xl text-gray-600 mt-3">
            You have <span className="font-bold">5</span> bood donate requset
          </h3>
          <div className="overflow-x-auto mt-10">
            <table className="table text-lg text-gray-600">
              {/* head */}
              <thead className="text-lg text-gray-600">
                <tr>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
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
                      {
                        (donationStatus!=="Inprogess" && donationStatus!=="Done" && donationStatus!=="Cancel" ) && <option value="Pending">Pending</option>
                      }
                      
                      <option value="Inprogess">Inprogess</option>
                      {
                        (donationStatus==="Inprogess") && <> <option value="Done">Done</option>
                      <option value="Cancel">Cancel</option></>
                      }

                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
