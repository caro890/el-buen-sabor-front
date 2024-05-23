import { Box, Typography } from "@mui/material"
import { SucursalesList } from "./SucursalesList"
import "../../../styles/AdminConsole.css"

export const Sucursales = () => {
  return (
    <div>
      <Box>
        <Typography variant="h5" gutterBottom>
          ¿Con qué sucursal quiere acceder?
        </Typography>
      </Box>
      <div className="d-flex flex-row card-container">
        <SucursalesList></SucursalesList>
      </div>
    </div>
  )
}
