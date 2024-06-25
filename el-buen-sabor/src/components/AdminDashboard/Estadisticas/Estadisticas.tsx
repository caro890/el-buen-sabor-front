import { Box, Typography } from "@mui/material";
import { RankingProductosModule } from "./Charts/RankingProductos";
import { Container } from "react-bootstrap";

export const Estadisticas = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Estadísticas Empresa
          </Typography>
        </Box>
        <Box>
          <RankingProductosModule business="empresa"/>
        </Box>
      </Container>
    </Box>
  )
}
