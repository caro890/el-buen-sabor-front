
import { Outlet } from "react-router";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { SucursalService } from "../../services/SucursalService";
import { setSucursal } from "../../redux/slices/SucursalReducer";

export const DeliveryLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let service = new SucursalService();
    service.getById(1).then((sucursal) => 
      dispatch(setSucursal(sucursal))
    )
  }, [])
  
  return (
    <div>
        
        <div>
          <Outlet/>
        </div>
    </div>
  )
}