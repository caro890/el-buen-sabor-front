import { Outlet } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/BasicSidebar/BasicSidebar"
import '../../styles/AdminDashboard.css'

export const DashboardLayout = () => {
  return (
    <div className="help-layout">
        <BasicSidebar/>    

        <div className="page-wrapper">
          <Outlet/>
        </div>
    </div>
  )
}
