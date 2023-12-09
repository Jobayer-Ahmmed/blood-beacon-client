import { Link } from "react-router-dom";
import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className=" h-screen relative">
      <div>
        <img src={banner} alt="" className=" h-screen w-full brightness-50" />
        <div className="w-80 md:w-[600px] lg:w-myWidth mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex lg:justify-between gap-10">
          <div className=" my-myMargin lg:my-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold ">
              Harmony of Hearts: Join <br /> the Lifesaving Symphony
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium my-7">
              BloodBeacon: Sparking Hope, Saving Lives. Join our community, <br />
              donate today, and be the beacon of change
            </p>
            <div className="flex flex-col md:flex-row gap-10">
            <Link to="/register"  className="text-xl text-center text-gray-300 font-bold  bg-red-600 px-10 py-2 outline-transparent hover:outline hover:outline-white hover:bg-transparent transition duration-500 hover:transition hover:duration-500 active:bg-red-800 active:text-white">
              Join as a donor
            </Link>
            <Link to="/search-donor" className="text-xl text-center text-gray-300 font-bold  bg-red-600 px-10 py-2 outline-transparent hover:outline hover:outline-white hover:bg-transparent transition duration-500 hover:transition hover:duration-500 active:bg-red-800 active:text-white">
              Search donor
            </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
