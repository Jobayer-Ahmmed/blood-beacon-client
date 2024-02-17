import { useForm } from "react-hook-form";
import useDistricts from "../../hooks/useDistricts/useDistricts";
import useAxios from "../../hooks/useAxios/useAxios";
import { useEffect, useState } from "react";

const SearchDonor = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const districts = useDistricts();
  const myAxios = useAxios();
  const [upzilas, setUpzilas] = useState([]);
  const [advance, setAdvance] = useState(0);
  const [searchItems, setSearchItems] = useState([])

  const districtName = watch("districts");
  const upzilaName = watch("upzilas");

  const getDistrict = districts.map(dis=>{
    return dis.name.toLowerCase()
  })

  useEffect(()=>{
    setSearchItems(...getDistrict)
    
  },[getDistrict])

  useEffect(() => {
    
    myAxios.get(`/upzilas/${districtName}`).then((res) => {
      // console.log(res.data)
      setUpzilas(res.data);

    });
  }, [districtName]);

  const onSubmit = (data) => {
    const {search} = data 
    console.log(searchItems?.length)
    const b = getDistrict.filter(dis=>dis.includes(search.toLowerCase()))

    console.log(b)

    // myAxios
    //   .get(
    //     `/search-donor?email=${email}&blood_group=${blood_group}&districtName=${districtName}&upzilaName=${upzilaName}`
    //   )
    //   .then((res) => {
    //     setSearch(res.data);
    //     console.log(res.data);
    //   });
  };

  return (
    <div className="w-full px-5  lg:px-72 py-[120px]">
      <div className="">
        <div className="bg-base-300 p-10 rounded-lg ">
          <form className="text-black w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mt-3 md:relative">
                  <input
                    className="  w-full h-10 pl-3 text-lg rounded-sm"
                    {...register("search")}
                    type="text"
                    placeholder="Keywords"
                  />
                  <input
                    className={`${advance && "hidden"} cursor-pointer mt-3 md:mt-0 h-10 bg-red-600 px-10 text-white text-lg rounded-sm md:absolute md:top-0 md:right-0 active:font-bold`}
                    type="submit"
                    value="Search now"
                  />
                </div>
                <br />
            {!advance ? (
              <div>

                <button
                  className="btn btn-outline mt-5"
                  onClick={() => setAdvance(1)}
                >
                  Advance Search
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-col lg:flex-row lg:justify-center gap-5 items-center ">
                  <div className="">
                    <label className=" text-xl">Blood Group</label> <br />
                    <select
                      {...register("blood_group")}
                      className="px-4 h-10 rounded-sm text-xl"
                    >
                      <option>Select Blood Group</option>
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
                  <div>
                    <label className=" text-xl">District</label> <br />
                    <select
                      {...register("districts")}
                      className=" px-4 h-10 rounded-sm text-xl"
                    >
                      <option>Select One</option>
                      {districts.map((district) => (
                        <option key={district._id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className=" text-xl">Upzila</label> <br />
                    <select
                      {...register("upzilas")}
                      className=" px-4 h-10 rounded-sm text-xl"
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
                    className={`cursor-pointer mt-10 h-10 bg-red-600 px-10 text-white text-lg rounded-sm active:font-bold`}
                    type="submit"
                    value="Search now"
                  />
                  <br />
                <button
                  className="btn btn-outline mt-5"
                  onClick={() => setAdvance(0)}
                >
                  Back to general Search
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;
