import { Outlet } from "react-router-dom"
import Sidebar from "../Shared/Sidebar/Sidebar"


const DashboardLayout = () => {
  return (
    <div className="lg:w-myWidth mx-auto my-myMargin">
        <div className="flex lg:flex-row flex-col gap-20">
            <div>
              <Sidebar/>
            </div>
            <div className="flex-1">
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout