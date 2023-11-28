import { useState } from "react"
import { Link } from "react-router-dom"


const AllUsers = () => {
    const [userStatus, setUserStatus] = useState('Active')
    const [makeAdmin, setMakeAdmin] = useState(true)


    const handleSatus = () =>{
        if(userStatus==="Active")
            setUserStatus("Blocked")
        else
            setUserStatus("Active")
    }

    const handleAdmin =()=>{
        setMakeAdmin(!makeAdmin)
    }

  return (
    <div>
        <div>
            <div className="flex justify-end gap-5">
                <Link to="/create-admin" className="underline">Create An Admin</Link>
                <Link to="/create-volunteer" className="underline">Create A Volunteer</Link>
            </div>
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
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>1</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td> Al Amin</td>
        <td>Purple</td>
        <td>
            {
                userStatus==="Active" ? 
                <p className="text-green-600 font-medium">{userStatus}</p>
                : <p className="text-red-600 font-medium">{userStatus}</p>
            }
        </td>
        <td>
            {
                userStatus==="Active" ? 
                <button className="btn btn-xs btn-neutral" onClick={handleSatus}>Block</button> 
                : <button className="btn btn-xs btn-neutral" onClick={handleSatus}>Active</button>
            }
        </td>
        <td> <button className="btn btn-xs btn-neutral">Make Him Admin</button> </td>
        <td> <button className="btn btn-xs btn-neutral">Make Him Volunteer</button> </td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
    </div>
  )
}

export default AllUsers