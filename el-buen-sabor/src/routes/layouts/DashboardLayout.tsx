import { Outlet } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/BasicSidebar/BasicSidebar"
import '../../styles/AdminDashboard.css'

export const DashboardLayout = () => {
  return (
    <>
    
       
        <BasicSidebar/>    
        
        <div className=" page-wrapper">
          <Outlet/>
        </div>
       
    </>
  )
}
