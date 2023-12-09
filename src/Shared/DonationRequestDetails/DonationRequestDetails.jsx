import { useLoaderData } from "react-router-dom"


const DonationRequestDetails = () => {
    const {data} = useLoaderData()
    const {name,email,recipient_name,districts,upzilas,hospital_name,address,donation_date,donation_time,request_message,donation_status} = data
    console.log(data)
  return (
    <div>
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                <h3 className="text-xl text-gray-600 font-bold mb-3 underline">Reciepent Information</h3>
                <div>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Name : {recipient_name}</p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Upzila : {upzilas}</p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent District : {districts}</p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Address : {address}</p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Hospital : {hospital_name}</p>
                </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl text-gray-600 font-bold mb-3 underline">Donor Information</h3>
                    <div>
                    <p className="mt-1 text-gray-600 font-bold">Donor Name : {name}</p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Email : {email}</p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Message : {request_message}</p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Status : {donation_status}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl text-gray-600 font-bold mb-3 underline">Time Information</h3>
                    <div>
                    <p className="mt-1 text-gray-600 font-bold">Donation Date : {donation_date}</p>
                    <p className="mt-1 text-gray-600 font-bold">Donation Time : {donation_time}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DonationRequestDetails