import { Box, Typography } from "@mui/material"
import { SucursalesList } from "./SucursalesList"
import { useAppSelector } from "../../../hooks/redux"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useAppDispatch } from "../../../hooks/redux"
import { EmpleadoService } from "../../../services/EmpleadoService"
import { Empleado } from "../../../types/Empresas/Empleado"
import { setEmpresa } from "../../../redux/slices/EmpresaReducer"
import { getRol } from "../../../services/TokenService"

export const Sucursales = () => {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();
  const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);

  useEffect(() => {
    if(getRol()?.includes('GERENTE')){
      const service = new EmpleadoService();
      const auth0Id = user?.sub;
      if(auth0Id) {
        service.getUserByAuth0Id(auth0Id).then((empleado: any) => {
          let emp = empleado as Empleado;
          dispatch(setEmpresa(emp.sucursal.empresa));
        })
      }
    }
  }, [])

  return (
    <div>
      <Box>
        <Typography variant="h5" gutterBottom>
          {empresaSelected?.nombre} <br/>
          ¿Con qué sucursal quiere acceder?
        </Typography>
      </Box>
      <div className="d-flex flex-row card-container">
        <SucursalesList></SucursalesList>
      </div>
    </div>
  )
}
