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
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Name : <span className="text-gray-500"> {recipient_name}</span></p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Upzila : <span className="text-gray-500"> {upzilas}</span></p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent District : <span className="text-gray-500">{districts}</span></p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Address : <span className="text-gray-500">{address}</span></p>
                    <p className="mt-1 text-gray-600 font-bold">Reciepent Hospital : <span className="text-gray-500">{hospital_name}</span></p>
                </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl text-gray-600 font-bold mb-3 underline">Donor Information</h3>
                    <div>
                    <p className="mt-1 text-gray-600 font-bold">Donor Name : <span className="text-gray-500">{name}</span></p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Email : <span className="text-gray-500">{email}</span> </p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Message : <span className="text-gray-500">{request_message}</span> </p>
                    <p className="mt-1 text-gray-600 font-bold">Donor Status : <span className="text-gray-500">{donation_status}</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl text-gray-600 font-bold mb-3 underline">Time Information</h3>
                    <div>
                    <p className="mt-1 text-gray-600 font-bold">Donation Date : <span className="text-gray-500">{donation_date}</span> </p>
                    <p className="mt-1 text-gray-600 font-bold">Donation Time : <span className="text-gray-500">{donation_time}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DonationRequestDetails