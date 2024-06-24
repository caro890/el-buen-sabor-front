import { Box, Typography } from "@mui/material";
import { RankingProductosModule } from "./Charts/RankingProductos";

export const Estadisticas = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Estadísticas
        </Typography>
      </Box>
      <Box>
        <RankingProductosModule business="sucursal"/>
        <RankingProductosModule business="empresa"/>
      </Box>
    </Box>
  )
}
