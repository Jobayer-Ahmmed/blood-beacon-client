import { Outlet } from "react-router-dom"
import Sidebar from "../Shared/Sidebar/Sidebar"


const DashboardLayout = () => {
  return (
    <div className="md:px-xPadding my-myMargin">
        <div className="flex lg:flex-row flex-col gap-10">
            <div className="px-5">
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