import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import axios from "axios";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import useAxios from "../../hooks/useAxios/useAxios";
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import myAuth from "../../firebase/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const Register = () => {
  const { createMyUser } = useContext(MyContext);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const districts = useDistricts();
  const myAxios = useAxios();
  const [upzilas, setUpzilas] = useState([]);
  const navigate = useNavigate();

  const districtName = watch("districts");
  const upzilaName = watch("upzilas");

  useEffect(() => {
    myAxios.get(`/upzilas/${districtName}`).then((res) => {
      // console.log(res.data)
      setUpzilas(res.data);
    });
  }, [districtName]);

  const onSubmit = (data) => {
    const { email, password, confirm_password, username, blood_group } = data;
    const imageFile = { image: data.image[0] };

    if (password === confirm_password) {
      setIsConfirm(false);
      createMyUser(email, password).then(() => {
        // for image insert in imgbb
        axios
          .post(image_upload_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            // for pushing name & image in firebase
            updateProfile(myAuth.currentUser, {
              displayName: username,
              photoURL: res.data.data.display_url,
            }).then(() => console.log("update successfull"));
            // pushing data in database
            myAxios
              .post("/user", {
                status: "Active",
                user_type: "Donor",
                email,
                username,
                district: districtName,
                upzila: upzilaName,
                blood_group,
                image: res.data.data.display_url,
              })
              .then((res) => {
                console.log(res.data);
                toast.success("Registration successfull");
                navigate("/");
              });
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
      <div className="w-[95%] md:w-[70%] lg:w-[45%] my-28 bg-base-300 p-10 md:p-20 rounded-md opacity-75  flex md:flex-row flex-col-reverse justify-center items-center">
        <div>
          <h1 className="text-3xl text-center font-semibold mb-6">
            Register Now!
          </h1>
          <form
            className="text-black w-full "
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-xl">Name</label>
            <br />
            <input
              className="mt-3 h-10 pl-3 text-lg w-full rounded-sm"
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
              className="mt-3 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            <br />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}{" "}
            <br />
            <div className="lg:flex lg:justify-between  w-full  lg:gap-10">
              <div className="w-full">
                <label className="mt-5 text-xl">Password</label>
                <br />
                <input
                  className="mt-3 mb-5 h-9 pl-3 text-lg rounded-sm w-full lg:w-52"
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
              <div className="">
                <label className="mt-5 text-xl">Confirm Password</label>
                <br />
                <input
                  className="mt-3 mb-5 h-9 pl-3 text-lg rounded-sm w-full lg:w-52"
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
            <label className="mt-5 text-xl ">Upload Your Image</label>
            <br />
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input h-10 mt-3 rounded-sm text-xl w-full"
            />{" "}
            <br />
            <div className="mt-5">
              <label className=" text-xl">Blood Group</label>
              <select
                {...register("blood_group", { required: true })}
                className="mt-3 px-4 h-10 rounded-sm text-xl w-full"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            {/* for option */}
            <div className="mt-5 lg:flex lg:justify-between lg:gap-10 w-full">
              <div>
                <label className=" text-xl">District</label> <br />
                <select
                  {...register("districts", { required: true })}
                  className="mt-3 px-4 h-10 rounded-sm text-xl w-full"
                >
                  <option>Select One</option>
                  {districts.map((district) => (
                    <option key={district._id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 lg:mt-0">
                <label className=" text-xl">Upzila</label> <br />
                <select
                  {...register("upzilas", { required: true })}
                  className="mt-3 px-4 h-10 rounded-sm text-xl w-full"
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
            <input
              className="cursor-pointer mt-10  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Register"
            />
          </form>
          <p className="text-lg text-priColor mt-6 ">
            Already have an account? Go for &nbsp;
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
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

export default Register;
