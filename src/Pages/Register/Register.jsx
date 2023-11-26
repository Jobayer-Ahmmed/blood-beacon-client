import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import axios from "axios";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import useAxios from "../../hooks/useAxios/useAxios";
import { Helmet } from "react-helmet-async";

const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const Register = () => {
  const { createMyUser, googleLogin } = useContext(MyContext);
  const [isConfirm, setIsConfirm] = useState(false);
  const districts = useDistricts();
  const myAxios = useAxios();
  const [districtId, setDistrictId] = useState(1);
  const [upzilas, setUpzilas] = useState([])
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');


  useEffect(()=>{
    console.log(districtId)
    myAxios.get(`/upzilas/${districtId}`)
    .then(res=>setUpzilas(res.data))
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

  const handleRegister = (e) => {
    e.preventDefault()
    const forFormReset = e.target
    const form = new FormData(e.currentTarget)

    const username = form.get("username")
    const email = form.get("email")
    const password = form.get("password")
    const confirm_password = form.get("confirm_password")
    const blood_group = form.get("blood_group")
    const district = form.get("district")
    const upzila = form.get("upzila")

    const myImage = forFormReset.image.files[0]
    setImage(myImage)
    console.log(image) 
    const imageData = new FormData()
    imageData.append("image", image)


    axios.post(image_upload_api, imageData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      setImageURL(res.data.data.display_url)
      console.log(res)
     
    })
    .catch(err=>console.log(err))

    if (password === confirm_password) {
      setIsConfirm(false);
      createMyUser(email, password)
      .then((res) => {
        console.log(res);
      myAxios.post("/donor",{username, email, district, upzila, blood_group, image:imageURL})
      .then(res=>console.log(res))


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
      <div className="w-full md:w-[90%] lg:w-3/5 my-28 bg-base-300 p-10 rounded-md opacity-75  flex md:flex-row flex-col-reverse justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl text-center font-semibold mb-6">
            Register Now!
          </h1>
          <form
            className="text-black lg:w-full"
            onSubmit={handleRegister}
          >
            <label className="text-xl">Username</label>
            <br />
            <input
              className="mt-3 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              type="text"
              placeholder="Username"
              name="username"
            />
            <br />

            <label className=" text-xl">Email</label>
            <br />
            <input
              className="mt-3 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              type="email"
              placeholder="Email"
              name="email"
            />
            <br />


            <div className="lg:flex lg:justify-between lg:gap-10 w-full">
              <div className="w-full">
                <label className="mt-5 text-xl">Password</label>
                <br />
                <input
                  className="mt-3 mb-5 w-full h-9 pl-3 text-lg rounded-sm"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <br />

              </div>
              <div className="w-full">
                <label className="mt-5 text-xl">Confirm Password</label>
                <br />
                <input
                  className="mt-3 mb-5 w-full h-9 pl-3 text-lg rounded-sm"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                />
                <br />
              </div>
            </div>
            <label className="mt-5 text-xl">Upload Your Image</label>
            <br />
            <input
              type="file"
              className="file-input w-full h-10 mt-3 text-xl"
              name="image"
            />
            <br />


            {/* for districts option */}
            <div className="mt-5 flex md:flex-row flex-col justify-between gap-5">
              <div>
                <label className="text-xl">District</label><br />
                  <select
                    onChange={(e) => {
                      setDistrictId(e.target.value);
            
                    }}
                    className="w-full mt-2 px-4 h-10 rounded-sm text-xl  text-gray-600"
                    name="district"
                  >
                    {districts.map((district) => (
                      <option key={district._id} value={district.district_id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
              </div>

                        {/* for upzila option */}
              <div>
                <label className=" text-xl">Upzila</label> <br />
                  <select                    
                    className="w-full mt-2 md px-4 h-10 rounded-sm text-xl text-gray-600"
                    name="upzila"
                  >
                    {upzilas.map((upzila) => (
                      <option key={upzila._id} value={upzila.id}>
                        {upzila.name}
                      </option>
                    ))}
                  </select>
              </div>
                       {/* for blood group option */}
              <div className="">
              <label className=" text-xl">Blood Group</label> <br />
              <select
                className="w-full mt-2 px-4 h-10 rounded-sm text-xl"
                name="blood_group"
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
            </div>
            <input
              className="cursor-pointer mt-8  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
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
