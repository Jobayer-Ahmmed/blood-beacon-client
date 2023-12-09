import React, { useEffect, useState } from "react"
import useAxios from "../../../hooks/useAxios/useAxios"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import { TiDeleteOutline } from "react-icons/ti"


const AllUsersDonationRequest = () => {
    const [donationStatus, setDonationStatus] =useState('')
    const [donations, setDonations] = useState([])
    const [myCount, setMyCount] = useState([])
    const navigate = useNavigate()
    const myAxios = useAxios()


    const [count, setCount] = useState(0)
    const [perPageItems, setPerPageItems] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
  

    const getDonationsData = ()=>{
      myAxios.get(`/donation?page=${currentPage}&size=${perPageItems}`)
      .then(res=>setDonations(res.data))
  }

  useEffect(()=>{
      getDonationsData()
  },[currentPage, perPageItems, donationStatus, myCount, myAxios])


    useEffect(()=>{
      setMyCount(myCount+1)
      myAxios.get(`/donation-request-count`)
      .then(res=>{
        setCount(res.data.myResult)  // myResult is object data which is come from backend
      })
    },[])

    const totalPage = Math.ceil(count/perPageItems)
    const pages = [...Array(totalPage).keys()]

  
    const handlePerPageItem=(e)=>{
      const val = parseInt(e.target.value)
      setCurrentPage(1)
      setPerPageItems(val)
    }
    const handlePrevious = ()=>{
      if(currentPage>1)
        setCurrentPage(currentPage - 1)
    }
    const handleNext = ()=>{
      if(currentPage<totalPage)
        setCurrentPage(currentPage + 1)
    }





    const handleDonationStatus = React.useCallback((e, id) => {
      setMyCount(myCount+1)
        setDonationStatus(e.target.value);
        myAxios.put(`/donation_status/${id}`, {
          donation_status:e.target.value
        })
        .then(res=>console.log(res.data))
    }, []);

      const handleDelete= (id)=>{
        setMyCount(myCount+1)
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
                    getDonationsData()
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
        <h1 className="text-3xl text-gray-600 font-medium">All Donations Request</h1>
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
                  donations?.map((donation,id)=><tr key={donation._id}>
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
                    <p>{donation.name}</p>
                    <p>{donation.email}</p>
                  </td>
                  <td><button className="text-xl font-bold" onClick={()=>navigate(`/dashboard/edit-request/${donation._id}`)}><FaRegEdit/></button></td>
                  <td><button className="text-3xl font-bold text-red-600" onClick={()=>handleDelete(donation._id)}><TiDeleteOutline/></button></td>
                  <td><button  onClick={()=>navigate(`/dashboard/donation-requset-details/${donation._id}`)}>Details</button></td> 
                </tr>)
                }
              </tbody>
            </table>
          </div>
          </>
          }
        </div>
        <div className="flex justify-center gap-3 mt-10">
        <button className="btn" onClick={handlePrevious}>Previous</button>
          {
            pages.map(page=><button
            className={ currentPage===page+1 ? `btn btn-outline` : `btn`} 
            onClick={()=>setCurrentPage(page+1)}
            key={page+1}>{page+1}</button>)
          }
          <button className="btn" onClick={handleNext}>Next</button>
          <select className="ml-10 bg-slate-200 p-3" value={perPageItems} onChange={handlePerPageItem}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
    </div>
  )
}

export default AllUsersDonationRequest