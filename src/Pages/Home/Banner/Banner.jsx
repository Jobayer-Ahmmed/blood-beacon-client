import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className="h-screen relative">
      <div>
        <img src={banner} alt="" className=" h-screen w-full brightness-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex gap-10">
          <div>
            <h1 className="text-4xl text-gray-200 font-bold ">Harmony of Hearts: Join <br /> the  Lifesaving Symphony</h1>
            <p className="text-xl text-gray-300 font-medium my-7">
              BloodBeacon: Sparking Hope, Saving Lives. Join our community,
              donate today, and be the beacon of change
            </p>
            <button className="text-xl text-gray-300 font-bold  bg-red-600 px-10 py-2 outline-transparent hover:outline hover:outline-white hover:bg-transparent transition duration-500 hover:transition hover:duration-500 active:bg-red-800 active:text-white">Join as a donor</button>
          </div>
          <div>
            <p>search</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
