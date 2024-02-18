import { FaUsers } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import useUsers from "../../hooks/useUsers/useUsers";
import useGetDonation from "../../hooks/useGetDonation/useGetDonation";
import useFunding from "../../hooks/useFunding/useFunding";

const AdminFeatureCard = () => {
  const users = useUsers();
  const donationRequest = useGetDonation();
  const funding = useFunding()
  
  const TotalMoney = funding.reduce((total, single)=> total+Number(single.money.replace("$","")), 0)

  return (
    <div>
      <div className="bg-base-300 mt-8 p-10 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-0 ">
            <h1 className="text-7xl  font-bold text-gray-600">
              <FaUsers />
            </h1>
            <h1 className="text-2xl  font-medium text-gray-600"> Users</h1>
          </div>
          <div>
            <h3 className="text-xl  font-medium text-gray-600">
              Total Users : {users?.length}
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-base-300 mt-8 p-10 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-0 ">
            <h1 className="text-7xl  font-bold text-green-600">
              <RiRefund2Fill />
            </h1>
            <h1 className="text-2xl  font-medium text-gray-600"> Fundings</h1>
          </div>
          <div>
            <h3 className="text-xl  font-medium text-gray-600">
              Total Fund : ${TotalMoney}
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-base-300 mt-8 p-10 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-8 md:gap-0 ">
            <h1 className="text-7xl  font-bold text-red-600">
              <MdBloodtype />
            </h1>
            <h1 className="text-2xl  font-medium text-gray-600">
              {" "}
              Blood Donation Request
            </h1>
          </div>
          <div>
            <h3 className="text-xl  font-medium text-gray-600">
              Total Blood Donation Request : {donationRequest?.length}{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeatureCard;
