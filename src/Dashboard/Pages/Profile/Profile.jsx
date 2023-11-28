import { useContext } from "react"
import {FaRegEdit} from "react-icons/fa"
import { MyContext } from "../../../ContextApi/MyAuthProvider"
import useProfile from "../../../hooks/useProfile/useProfile"

const Profile = () => {
  const {blood_group, district, upzila} = useProfile()
  
  const {myUser} = useContext(MyContext)
  const {displayName, photoURL, email} = myUser
  return (
    <div>
        <div>
            <div className="flex justify-center">
                <img className="h-64 w-64 rounded-full" src={photoURL} alt="" />
                <FaRegEdit className="inline ml-10 text-3xl font-medium text-gray-600"/>
            </div>
            <div>
                <p className="mt-10 text-xl font-medium text-gray-600">Your Email : <span className="font-bold"> {email}</span></p>
                <p className="my-2 text-xl font-medium text-gray-600">Username :<span  className="font-bold">{displayName}</span><FaRegEdit className="inline ml-10"/></p>
                <p  className="mt-2 text-xl font-medium text-gray-600">Address :<span  className="font-bold"> {upzila}, {district}</span><FaRegEdit className="inline ml-10"/> </p>
                <p  className="mt-2 text-xl font-medium text-gray-600">Blood Group : <span  className="font-bold">{blood_group}</span><FaRegEdit className="inline ml-10"/></p>
            </div>
        </div>
    </div>
  )
}

export default Profile