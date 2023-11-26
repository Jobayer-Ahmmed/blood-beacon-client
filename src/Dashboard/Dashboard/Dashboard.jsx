import { Helmet } from "react-helmet-async"




const Dashboard = () => {
  return (
    <div className="p-10">
        <Helmet>
            <title>BloodBeacon | DashBord</title>
        </Helmet>
        {/* dynamic name */}
        <h1 className="text-3xl font-medium text-gray-600">Welcome, Jobayer</h1> 
        <div>
          <div>
            <h3 className="text-2xl text-gray-600">You have <span className="font-bold">5</span> bood donate requset</h3>
            <div>
              <div>
                <p className="text-xl font-bold text-gray-600">Request by</p>
                <div className="mt-3 mb-5 w-28 h-[2px] bg-gray-600"></div>
                <p>Ramjan</p>
              </div>
              <div>
                <p>Location</p>
                <div></div>
              </div>
              
            </div>
          </div>          
        </div>
    </div>
  )
}

export default Dashboard