import { Outlet, useNavigate } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/SidebarMenu/BasicSidebar"
import '../../styles/AdminDashboard.css'
import { useEffect } from "react";
import { getRol } from "../../services/TokenService";
import { useAppSelector } from "../../hooks/redux";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const sucursalActiva = useAppSelector((state) => (state.sucursalReducer.sucursal));
  const empresaActiva = useAppSelector((state) => (state.empresaReducer.empresa));

  useEffect(() => {
    if(sucursalActiva==null){
      if(getRol()?.includes('ADMIN') && empresaActiva==null){
        navigate("/admin-console");
      }
      navigate("/admin-console/sucursales/"+empresaActiva?.id);
    }
  }, []);

  return (
    <div>
        <BasicSidebar/>    
        
        <div className="page-wrapper">
          <Outlet/>
        </div>
       
    </div>
  )
};
