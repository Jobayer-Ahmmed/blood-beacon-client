import { useForm } from "react-hook-form";
import useDistricts from "../../../hooks/useDistricts/useDistricts";
import useAxios from "../../../hooks/useAxios/useAxios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "../../../ContextApi/MyAuthProvider";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import myAuth from "../../../firebase/firebase.config";
import useProfile from "../../../hooks/useProfile/useProfile";
import { useNavigate } from "react-router-dom";

const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const ProfileEdit = () => {
    const {blood_group, district, upzila} = useProfile()
    // console.log(blood_group)
    const {myUser} = useContext(MyContext)
    const {displayName, photoURL, email} = myUser
    // console.log(photoURL)
    const districts = useDistricts();
    const myAxios = useAxios();
    const [upzilas, setUpzilas] = useState([])
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues:{
            username:displayName,
            image:photoURL,
            blood_group:blood_group
        },
        
      });

      const navigate = useNavigate()

      const districtName = watch("districts")
      const upzilaName = watch("upzilas")

      useEffect(()=>{
        myAxios.get(`/upzilas/${districtName}`)
        .then(res=>{
          // console.log(res.data)
          setUpzilas(res.data)
        })
      },[districtName])

    //   useEffect(()=>{
    //     myAxios.get(`/user/${email}`)
    //     .then(res=>{
    //         console.log(res.data)
    //     })
    //   },[])

      const onSubmit = (data) => {
        const { username,blood_group } = data;
        const imageFile = { image: data.image[0] };
        
    

              // for image insert in imgbb
              axios.post(image_upload_api, imageFile, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                    // console.log(res.data);
                    // for pushing name & image in firebase
                    updateProfile(myAuth.currentUser, {
                      displayName: username, 
                      photoURL: res.data.data.display_url
                      })
                    .then(()=>console.log("firebase update successfull"))
                      // pushing data in database
                    myAxios.put(`/user/${email}`,{
                      district:districtName,
                      upzila:upzilaName,
                      blood_group
                    })
                    .then(()=>{
                    //   console.log(res.data)
                      toast.success("Your Profile is updated")
                      setTimeout(() => {
                          navigate("/dashboard/profile")
                    }, 1000);
                    })
              });
    


      };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-gray-600 font-medium"> Change Your Profile</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div    className="w-full my-28 bg-base-300 p-10 rounded-md flex md:flex-row flex-col-reverse justify-center items-center">
        
        <form
            className="text-black lg:w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mt-5 text-xl">Email</label>
            <input
              className="mt-3  w-full h-10 pl-3 text-lg rounded-sm"
              {...register("email", { required: true })}
              type="email"
              value={email}
            />
            <label className="text-xl">Name</label>
            <br />
            <input
              className="mt-3 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("username", { required: true })}
              type="text"
              placeholder="Name"
            />
            <br />
            {errors.username && (
              <span className="text-red-600">Username is required</span>
            )}{" "}
            <br />
            <label className="mt-5 text-xl">Upload Your Image</label>
            <br />
            <input
              {...register("image", { required: true })}
              type="file"
             
              className="file-input w-full h-10 mt-3 text-xl"
            />
            <br />
            <div className="mt-5">
              <label className=" text-xl">Blood Group</label>
              <select
                {...register("blood_group", { required: true })}
                className="ml-5 px-4 h-10 rounded-sm text-xl"
                // defaultChecked={blood_group}
                defaultValue={blood_group}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O+">O-</option>
              </select>
            </div>

            {/* for option */}
            <div className="mt-5 flex md:justify-between">
              <div>
                <label className=" text-xl">District</label>
                  <select

                    {...register("districts", { required: true })}
                    className="ml-5 px-4 h-10 rounded-sm text-xl"
                  >
                    <option>Select One</option>
                    {districts.map((district) => 
                      <option key={district._id} value={district.name}>
                        {district.name}
                      </option>
                 )}
                  </select>
              </div>

              <div>
                <div>
                  <label className=" text-xl">Upzila</label>
                    <select
                      {...register("upzilas", { required: true })}
                      className="ml-5 px-4 h-10 rounded-sm text-xl"
                    >
                      <option>Select District First</option>
                      {upzilas?.map((upzila) => (
                        <option key={upzila._id} value={upzila.name}>
                          {upzila.name}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
            </div>
            <input
              className="cursor-pointer mt-10  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Update"
            />
        </form>
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
  );
};

export default ProfileEdit;
