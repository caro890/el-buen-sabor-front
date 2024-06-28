import { EmpleadoService } from "../../services/EmpleadoService";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { setSucursal } from "../../redux/slices/SucursalReducer";
import { Empleado } from "../../types/Empresas/Empleado";
import { useAuth0 } from "@auth0/auth0-react";

export const DeliveryLayout = () => {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const service = new EmpleadoService();
    const auth0Id = user?.sub;
    if(auth0Id) {
      service.getUserByAuth0Id(auth0Id).then((empleado: any) => {
        let emp = empleado as Empleado;
        dispatch(setSucursal(emp.sucursal.id))
      })
    }
  }, [])
  
  return (
    <div>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}