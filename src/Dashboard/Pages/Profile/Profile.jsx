import { useContext, useState } from "react"
import {FaRegEdit} from "react-icons/fa"
import { MyContext } from "../../../ContextApi/MyAuthProvider"
import useProfile from "../../../hooks/useProfile/useProfile"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const Profile = () => {
  const {blood_group, district, upzila} = useProfile()
  // console.log(blood_group, district, upzila)
  const {myUser} = useContext(MyContext)
  const {displayName, photoURL, email} = myUser
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
        <div>
            <div className="flex justify-center">
                <img name="image" className="h-64 w-64 rounded-full" src={photoURL} alt="" />
            </div>
            <div>
                <p className="mt-10 text-xl font-medium text-gray-600">Email : <span className="font-bold"> {email}</span></p>
                <p className="my-2 text-xl font-medium text-gray-600">Username :<span  className="font-bold">{displayName}</span></p>
                <p  className="mt-2 text-xl font-medium text-gray-600">Address :<span  className="font-bold"> {upzila}, {district}</span> </p>
                <p  className="mt-2 mb-10 text-xl font-medium text-gray-600">Blood Group : <span  className="font-bold">{blood_group}</span></p>
                <Link to="/dashboard/profile-edit" className="cursor-pointer  py-2 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">Edit Your Profile</Link>
            </div>
        </div>
    </div>
  )
}

export default Profile



