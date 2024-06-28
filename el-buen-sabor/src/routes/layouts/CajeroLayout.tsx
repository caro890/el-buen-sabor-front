import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import styles from "../../styles/CajeroLayout.module.css"
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { setSucursal } from "../../redux/slices/SucursalReducer";
import { useAuth0 } from "@auth0/auth0-react";
import { EmpleadoService } from "../../services/EmpleadoService";
import { Empleado } from "../../types/Empresas/Empleado";

export const CajeroLayout = () => {
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
        <div className={styles.linksVistas + " mb-5"}>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="/cajero-console">Nuevos</Link>
          </Typography>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="entrega_pendiente">Entrega Pendiente</Link>
          </Typography>
        </div>

        <Outlet/>
    </div>
  )
}