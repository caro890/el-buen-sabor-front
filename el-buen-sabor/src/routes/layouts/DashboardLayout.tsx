import { Outlet, useNavigate } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/BasicSidebar/BasicSidebar"
import '../../styles/AdminDashboard.css'
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";

export const DashboardLayout = () => {
  //obtengo la empresa actual del estado global
  const empresaActual = useAppSelector((state) => state.empresaReducer.empresa);
  //obtengo la sucursal actual del estado global
  const sucursalActual = useAppSelector((state) => state.empresaReducer.activeSucursal);
  const navigate = useNavigate(); 

  useEffect(() => {   
    //cuando cargo el dashboard me aseguro de que haya una empresa y una sucursal seleccionadas
    if(empresaActual === null && sucursalActual === null){ 
      navigate("/admin-console"); //si no hay ninguna seleccionada redirecciono al la consola para seleccionarlas
    }
  }, []);

  return (
    <>
        <BasicSidebar/>    
        
        <div className=" page-wrapper">
          <Outlet/>
        </div>
       
    </>
  )
};
