import { Outlet } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/SidebarMenu/BasicSidebar"
import '../../styles/AdminDashboard.css'
import { Navbar } from "../../components/NavBar/Navbar";

export const DashboardLayout = () => {
  return (
    <div>
        <BasicSidebar/>    
        
        <div className="page-wrapper">
          <Outlet/>
        </div>
       
    </div>
  )
};
