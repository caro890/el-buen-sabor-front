import { SucursalesList } from "../../AdminConsole/Sucursales/SucursalesList"
import "../../../styles/SucursalCrud.module.css"
import { Typography, Box } from "@mui/material"
import { SucursalService } from "../../../services/SucursalService"

export const SucursalCrud = () => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Sucursales
          </Typography>
      </Box>
      <div className="sucursales-div">
        <SucursalesList></SucursalesList>
      </div>
    </div>
  )
}

export const sucursalesLoader = async () => {
  const service: SucursalService = new SucursalService();
  return service.getAll();
}

export const sucursalesByEmpresaLoader = async(id: number) =>{
  const service: SucursalService = new SucursalService();
  return service.findByEmpresaId(id);
}
