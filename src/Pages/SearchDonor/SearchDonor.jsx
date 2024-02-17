import { useForm } from "react-hook-form";
import useDonor from "../../hooks/useDonor/useDonor";
import { useState } from "react";
import useDonor2 from "../../hooks/useDonor2/useDonor2";

const SearchDonor = () => {
  const [searchItems, setSearchItems] = useState([])
  const {
    register,
    handleSubmit,
  } = useForm();
  const donor = useDonor();
  const donor2 = useDonor2()
// console.log(donor2)

  const onSubmit = (data) => {
    const { search } = data;
    const searchResult = donor?.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
    const c = donor2?.filter(obj =>  searchResult.includes(obj.username))
    console.log(c)
    setSearchItems(c)

    // const { search } = data;
    // const searchResult = donor?.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
    // const c = donor2?.filter(obj =>  searchResult.some(result => result.username === obj.username));
    // console.log(c)
    // setSearchItems(c);


    if(searchItems?.length){
console.log(searchItems)
    }
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
                className={`cursor-pointer mt-3 md:mt-0 h-10 bg-red-600 px-10 text-white text-lg rounded-sm md:absolute md:top-0 md:right-0 active:font-bold`}
                type="submit"
                value="Search now"
              />
            </div>
            <br />

          </form>
<div>
{
        searchItems?.map((res, id)=><p key={id}>{res.district}</p>)   
}
</div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;
