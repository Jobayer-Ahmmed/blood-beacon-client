
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import axios from "axios";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import useAxios from "../../hooks/useAxios/useAxios";
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import myAuth from "../../firebase/firebase.config";

const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const Register = () => {
  const { createMyUser, googleLogin } = useContext(MyContext);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const districts = useDistricts();
  const myAxios = useAxios();
  const [upzilas, setUpzilas] = useState([])


  const districtName = watch("districts")
  const upzilaName = watch("upzilas")



 


  useEffect(()=>{
    myAxios.get(`/upzilas/${districtName}`)
    .then(res=>{
      // console.log(res.data)
      setUpzilas(res.data)
    })
  },[districtName])

  const handleGoogleLogin = () => {
    // googleLogin()
    // .then((res)=>{
    //     console.log(res)
    //     myAxios.post(`/user?email=${res.user.email}`,{
    //         email:res.user.email
    //     })
    //     .then(()=>{
    //             console.log("signup successfull")
    //     })
    // })
  };

  const onSubmit = (data) => {
    const { email, password, confirm_password, username,blood_group } = data;
    const imageFile = { image: data.image[0] };
   


    if (password === confirm_password) {
      setIsConfirm(false);
      createMyUser(email, password).then(() => {
          // for image insert in imgbb
          axios.post(image_upload_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            // for pushing name & image in firebase
            updateProfile(myAuth.currentUser, {
              displayName: username, 
              photoURL: res.data.data.display_url
              })
            .then(()=>console.log("update successfull"))
              // pushing data in database
            myAxios.post("/user",{
              user_type: "donor",
              email,
              district:districtName,
              upzila:upzilaName,
              blood_group,
            })
            .then(res=>{
              console.log(res.data)
              console.log("egistertration successful")
            })
          });


      });
    } else {
      setIsConfirm(true);
    }
  };

  return (
    <div className="register_page min-h-screen flex justify-center items-center md:p-0 p-5 ">
      <Helmet>
        <title>BloodBeacon | Register</title>
      </Helmet>
      <div className="lg:w-1/2 my-28 bg-base-300 p-10 rounded-md opacity-75  flex md:flex-row flex-col-reverse justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl text-center font-semibold mb-6">
            Register Now!
          </h1>
          <form
            className="text-black lg:w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <label className="mt-5 text-xl">Email</label>
            <br />
            <input
              className="mt-3  w-full h-10 pl-3 text-lg rounded-sm"
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            <br />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}{" "}
            <br />
            <div className="lg:flex lg:justify-between lg:gap-10 w-full">
              <div className="w-full">
                <label className="mt-5 text-xl">Password</label>
                <br />
                <input
                  className="mt-3 mb-5 w-full h-9 pl-3 text-lg rounded-sm"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  type="password"
                  placeholder="Password"
                />
                <br />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be at least 6 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must be at least one special character, one digit,
                    one uppercase, one lowercase
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="mt-5 text-xl">Confirm Password</label>
                <br />
                <input
                  className="mt-3 mb-5 w-full h-9 pl-3 text-lg rounded-sm"
                  {...register("confirm_password", { required: true })}
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.confirm_password?.type === "required" && (
                  <span className="text-red-600">
                    Confirm Password is required
                  </span>
                )}{" "}
                <br />
                {isConfirm && (
                  <span className="text-red-600">
                    Confirm Password doesn&apos;t match
                  </span>
                )}
              </div>
            </div>
            <label className="mt-5 text-xl">Upload Your Image</label>
            <br />
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full h-10 mt-3 text-xl"
            />{" "}
            <br />
            <div className="mt-5">
              <label className=" text-xl">Blood Group</label>
              <select
                {...register("blood_group", { required: true })}
                className="ml-5 px-4 h-10 rounded-sm text-xl"
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
              className="cursor-pointer mt-4  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Register"
            />
          </form>
          <p className="text-lg text-priColor mt-6 ">
            Already have an account? Go for
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
          <button className="btn btn-ghost" onClick={handleGoogleLogin}>
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
