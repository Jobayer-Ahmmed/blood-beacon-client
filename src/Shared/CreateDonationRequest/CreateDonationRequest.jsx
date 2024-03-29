import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import useAxios from "../../hooks/useAxios/useAxios";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProfile from "../../hooks/useProfile/useProfile";
import { useNavigate } from "react-router-dom";

const CreateDonationRequest = () => {
  const [upzilas, setUpzilas] = useState([]);
  const navigate = useNavigate()
  const { myUser } = useContext(MyContext);
  const { displayName, email } = myUser;
  const districts = useDistricts();
  const myAxios = useAxios();
  const {user_type, status} = useProfile()


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const districtName = watch("districts");
  const upzilaName = watch("upzilas");

  useEffect(() => {
    myAxios.get(`/upzilas/${districtName}`).then((res) => {
      // console.log(res.data)
      setUpzilas(res.data);
    });
  }, [districtName]);

  const onSubmit = (data) => {
    const {
      name,
      email,
      recipient_name,
      districts,
      upzilas,
      hospital_name,
      address,
      donation_date,
      donation_time,
      request_message,
      donation_status} = data
    console.log(data)

    myAxios.post("/donation", {
      name,
      email,
      recipient_name,
      districts,
      upzilas,
      hospital_name,
      address,
      donation_date,
      donation_time,
      request_message,
      donation_status,
      user_type
    })
    .then((res)=>{
      toast.success("Your request has sent")
      console.log(res.data)
      setTimeout(() => {
        navigate("/dashboard")
  }, 1000);
    })
  };

  return (
    <>
    {
      status==="Block" ? <div className="my-myMargin">
        <h1 className="text-3xl text-red-600 font-medium text-center">You have been blocked</h1>
        <p className="text-xl text-gray-600 font-medium text-center mt-6">Please, contact with BloodBeacon</p>
      </div>:
      <div className="w-full px-5">
      <div>
        <h1 className="text-3xl text-gray-600 font-medium">
          Request To Donate Blood
        </h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div className="lg:w-1/2 bg-base-300 p-10 rounded-md  flex md:flex-row flex-col-reverse justify-center items-center">
          <form
            className="text-black lg:w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-xl">Name</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("name")}
              type="text"
              value={displayName}
            />
            <br />
            <label className="text-xl">Email</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("email")}
              type="text"
              value={email}
            />
            <br />
            <label className="text-xl">Recipient Name</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("recipient_name")}
              type="text"
              placeholder="Recipient Name"
            />
            <br />
            <label className=" text-xl">Recipient District</label><br />
            <select
              {...register("districts", { required: true })}
              className="mt-2 mb-5 w-full px-4 h-10 rounded-sm text-xl"
            >
              <option>Select One</option>
              {districts.map((district) => (
                <option key={district._id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>{" "}
            <br />
            <label className=" text-xl">Recipient Upzila</label> <br />
            <select
              {...register("upzilas", { required: true })}
              className="mt-2 mb-5 w-full px-4 h-10 rounded-sm text-xl"
            >
              <option>Select District First</option>
              {upzilas?.map((upzila) => (
                <option key={upzila._id} value={upzila.name}>
                  {upzila.name}
                </option>
              ))}
            </select><br />
            <label className="text-xl">Recipient Hospital Name</label><br />
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("hospital_name")}
              type="text"
              placeholder="Hospital Name"
            /><br />
            
            <label className="text-xl">Address For Donate</label><br />
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("address")}
              type="text"
              placeholder="Vilage/Road no, Upzila, District"
            /> <br />
            
            <label className="text-xl">Donation Date</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("donation_date")}
              type="date"
              placeholder="Donation Date"
            /> <br />
            
            <label className="text-xl">Donation Time</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("donation_time")}
              type="text"
              placeholder="Donation Time (Ex_ 03:20 pm)"
            /> <br />
            
            <label className="text-xl">Request Message</label>
            <textarea
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("request_message")}
              type="text"
              placeholder="Leave a meassge"
            /> <br />
            
            <label className="text-xl">Donation Status</label>
            <input
              className="mt-2 mb-5 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("donation_status")}
              type="text"
              value={"Pending"}
            /> <br />
            <input
              className="cursor-pointer mt-4  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Request"
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
    }
    </>


  );
};

export default CreateDonationRequest;
