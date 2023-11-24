import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "../../ContextApi/MyAuthProvider";
import logo from "../../assets/logos/bloodbeacon.png"



const Navbar = () => {
  const { myUser, myLogOut } = useContext(MyContext);
  const email = myUser?.email
  const [theme, setTheme] = useState("light")
  
  const navlinks = <>
            <li className="text-lg">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-lg">
              <NavLink to="/donation_request">Donation Request</NavLink>
            </li>
            <li className="text-lg">
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li className="text-lg">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="text-lg">
              <NavLink to="/fundings">Fundings</NavLink>
            </li>



            {/* {
              email==="admin@admin.me" &&  <li>
              <NavLink to="/librarian">Librarian</NavLink>
              </li>
              
    
            } */}

  </>

  const handleToggle=e=>{
    if(e.target.checked){
      setTheme("dark")
    }
    else{
      setTheme("light")
    }
  }
  useEffect(()=>{
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem("theme")
    document.querySelector("html").setAttribute("data-theme",localTheme)
  },[theme])
  
  const handleLogout = () => {
    myLogOut()
      .then(() =>{
        toast.success("You are successfully logout")
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="navbar bg-base-100 fixed z-50 opacity-75 px-xPadding2 md:px-xPadding">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
          {navlinks}
          </ul>
        </div>
        {/* for logo */}
        <div>
          <span className="">
            <img src={logo} className="h-20" />
          </span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {navlinks}
        </ul>
      </div>
      <div className="navbar-end">
        {myUser ? (
          <div className="">
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                      <img className="w-10 h-10 hover:w-11 hover:h-11 rounded-full" src={myUser.photoURL} alt="" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="pl-4">
                 {myUser.displayName}
                </li>
                <li>
                <button
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="flex gap-6">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}



        <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" onChange={handleToggle}/>
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
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

export default Navbar;
