import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAxios from "../../../hooks/useAxios/useAxios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllUsers = () => {
    const [userStatus, setUserStatus] = useState('')
    const [myCount, setMyCount] =useState(1)
    const [users, setUsers] = useState([])
    const myAxios = useAxios()

    const [count, setCount] = useState(0)
    const [perPageItems, setPerPageItems] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
  

    useEffect(()=>{
      myAxios.get(`/users?page=${currentPage}&size=${perPageItems}`)
      .then(res=>setUsers(res.data))
    },[currentPage, perPageItems,userStatus, myCount, myAxios])

    useEffect(()=>{
      myAxios.get(`/all-users-count`)
      .then(res=>{
        setCount(res.data.myResult)  // myResult is object data which is come from backend
      })
    },[])
    
    console.log(count)
    const totalPage = Math.ceil(count/perPageItems)
    const pages = [...Array(totalPage).keys()]
    console.log(pages)
  
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





    const handleStatus=(id, status)=>{
      setMyCount(myCount+1)
      if(status==="Active"){
        setMyCount(myCount+1)
        setUserStatus(status)
        myAxios.put(`/user-status/${id}`, {
          status:"Block"
        })
        .then((res)=>console.log(res.data))
      }
      if(status==="Block"){
        setMyCount(myCount+1)
        setUserStatus(status)
        myAxios.put(`/user-status/${id}`, {
          status:"Active"
        })
        .then((res)=>console.log(res.data))
      }
    }

    const handleAdmin =(id, status)=>{
      setMyCount(myCount+1)
      if(status ==="Active"){
        myAxios.put(`/user-status/${id}`, {
          user_type:"Admin"
        })
        .then(()=>toast.success("This user become Admin"))
      }
      else{
        toast.warn("Block user is  not be Admin")
      }

    } 

    const handleVolunteer=(id, status)=>{
      setMyCount(myCount+1)
      if(status ==="Active"){
        myAxios.put(`/user-status/${id}`, {
          user_type:"Volunteer"
        })
        .then(()=>toast.success("This user become Volunteer"))
      }
      else{
        toast.warn("Block user is  not be Volunteer")
      }

    }
    
    
  return (
    <div className="w-full px-5">
        <div>
            <h1 className="text-3xl text-gray-600 font-medium"> All Users</h1>

        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Photo</th>
        <th>Email</th>
        <th>Username</th>
        <th>User Status</th>
        <th>Change User Status</th>
        <th>Make Admin</th>
        <th>Make Volunteer</th>
        <th>User type</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {
      users?.map((user, id)=>      <tr key={user._id}>
        <td>{id+1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{user.status}</td>
        <td className={user.user_type==="Admin" && "invisible"}>
            {
                userStatus==="Active" ? 
                <button  className="btn btn-xs btn-neutral" onClick={()=>handleStatus(user._id, user.status)}>{user.status==="Active" ? "Block":"Active"}</button> 
                : <button  className="btn btn-xs btn-neutral" onClick={()=>handleStatus(user._id, user.status)}>{user.status==="Active" ? "Block":"Active"}</button>
            }
        </td>
        <td> <button  onClick={()=>handleAdmin(user._id, user.status)} className={  user.user_type==="Admin" ? "btn btn-xs btn-neutral invisible" : "btn  btn-neutral"}>Make Him Admin</button> </td>
        <td> <button  onClick={()=>handleVolunteer(user._id, user.status)} className={  user.user_type==="Admin" || user.user_type=== "Volunteer" ? "btn  btn-neutral invisible" : "btn btn-xs btn-neutral"}>Make Him Volunteer</button> </td>
        <td>{user.user_type}</td>
      </tr>)
    }
    </tbody>
  </table>
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

        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </div>
  )
}

export default AllUsers