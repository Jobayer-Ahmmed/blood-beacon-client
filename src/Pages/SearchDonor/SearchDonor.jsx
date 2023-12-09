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
      const [upzilas, setUpzilas] = useState([])
      const [search, setSearch] = useState([])

      
  const districtName = watch("districts")
  const upzilaName = watch("upzilas")

  useEffect(()=>{
    myAxios.get(`/upzilas/${districtName}`)
    .then(res=>{
      // console.log(res.data)
      setUpzilas(res.data)
    })
  },[districtName])


  const onSubmit = (data) => {
    const { email, blood_group } = data;

    myAxios.get(`/search-donor?email=${email}&blood_group=${blood_group}&districtName=${districtName}&upzilaName=${upzilaName}`)
    .then(res=>{
        setSearch(res.data)
        console.log(res.data)
    })
  }

  return (
    <div className="w-full px-5  lg:px-72 py-[120px]">
        <div className="">
        <div className="bg-base-300 p-10 rounded-lg ">
        <form
            className="text-black w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mt-5 text-xl">Email</label>
            <br />
            <input
              className="mt-3  w-full h-10 pl-3 text-lg rounded-sm"
              {...register("email")}
              type="email"
              placeholder="Email"
            />
            <br />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}{" "}
            <br />            
            <div className="mt-5">
              <label className=" text-xl">Blood Group</label>
              <select
                {...register("blood_group")}
                className="ml-5 px-4 h-10 rounded-sm text-xl"
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
            <div className="mt-5 flex flex-col md:flex-row md:justify-between">
              <div>
                <label className=" text-xl">District</label>
                  <select

                    {...register("districts")}
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
                      {...register("upzilas")}
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
              value="Search now"
            />
          </form>
        </div>
        <div className="mt-10">
        {
            search?.length>0 && <>
                {search?.length>0 ? <h1 className="text-xl font-bold text-gray-600">Search found {search?.length}</h1>:''}
                {
                    search?.map(result=><div key={result._id}>
                        <p className="mt-4 mb-1">Donor Name : {result.username}</p>
                        <p>Donor Email : {result.email}</p>
                        <p>Donor Blood Group : {result.blood_group}</p>
                        <p>Address : {result.upzila}, {result.district}</p>
                    </div>)
                }
           </>
        }
        </div>
        </div>
    </div>
    
  )
}

export default SearchDonor