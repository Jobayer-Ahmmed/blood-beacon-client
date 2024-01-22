
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { MyContext } from "../../ContextApi/MyAuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {
  const { myLogin} = useContext(MyContext);
  const navigate = useNavigate()
  const location = useLocation()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit=(data)=>{
    const{email, password} = data
    myLogin(email, password)
    .then(()=>{
        console.log("login successfull")
        toast.success("Login successful")
        setTimeout(() => {
            navigate(location?.state ? location?.state: '/')
        }, 1000);
    })
    .catch(err=>console.log(err.message))
  }

 

  return (
    <div className="login_page min-h-screen flex justify-center items-center md:p-0 p-5 ">
      <Helmet>
        <title>BloodBeacon | Login</title>
      </Helmet>
      <div className="lg:w-2/5 mt-32 mb-myMargin bg-base-300 p-10 rounded-md opacity-75  flex md:flex-row flex-col-reverse justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl text-center font-semibold mb-6">
            Login Now!
          </h1>
          <form
            className="text-black lg:w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mt-5 text-xl text-priColor">Email</label>
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
            )}
            <br />
            <div className="lg:flex lg:justify-between lg:gap-10 w-full">
              <div className="w-full">
                <label className="mt-5 text-xl text-priColor">Password</label>
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


              </div>
              </div>
 
            <input
              className="cursor-pointer mt-4  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Login"
            />
          </form>
          <p className="text-lg text-priColor mt-6 ">
            Don&apos;t have an account? Go for &nbsp;
            <Link to="/register" className="underline">
              Register
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
  )
}

export default Login;
