import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import axios from "axios";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import useAxios from "../../hooks/useAxios/useAxios";



const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const Register = () => {
  const { createMyUser, googleLogin } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const [districtId, setdistrictId] = useState();
  const districts = useDistricts()
  const myAxios = useAxios()


  useEffect(()=>{
    myAxios.get(`/upzilas/${districtId}`)
    .then(res=>console.log(res.data))
  },[districtId])
  


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
    const { email, password, confirm_password } = data;
    const imageFile = { image: data.image[0] };

    console.log(email, password, confirm_password);

    if (password === confirm_password) {
      setIsConfirm(false);
      createMyUser(email, password).then((res) => {
        console.log(res);
        axios.post(image_upload_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
          });
      });
    } else {
      setIsConfirm(true);
    }
  };

  return (
    <div className="register_page min-h-screen flex justify-center items-center md:p-0 p-5 ">
      <div className="lg:w-2/5 my-28 bg-base-300 p-10 rounded-md opacity-75  flex md:flex-row flex-col-reverse justify-center items-center">
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
            <div  className="mt-5">
              <div>
                <label className=" text-xl">District</label>
                <select
                  {...register("districts", { required: true })}
                  className="ml-5 px-4 h-10 rounded-sm text-xl"
                >
                  {
                    districts?.map((district)=> {
                    
                      return(
                        <>
                        
                          <option key={district._id} value={district.name} onClick={()=>setdistrictId(district.district_id)}>{district.name}</option>

                        </>

                      )
                      })
                  }
                </select>
              </div>
              <div></div>
            </div>
            <input
              className="cursor-pointer mt-4  h-9 bg-red-600 px-10 text-white text-lg rounded-sm"
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