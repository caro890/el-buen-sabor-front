import { Box, Typography } from "@mui/material";
import { RankingProductosModule } from "./Charts/RankingProductos";
import { Container, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { Sucursal } from "../../../types/Empresas/Sucursal";
import { SucursalService } from "../../../services/SucursalService";
import { setSucursal } from "../../../redux/slices/SucursalReducer";
import { RecaudacionDiaria } from "./Charts/RecaudacionDiaria";
import { RecaudacionMensual } from "./Charts/RecaudacionMensual";
import { CostosGanancias } from "./Charts/CostosGanancias";
import { InformeExcel } from "./Charts/InformeExcel";

export const EstadisticasSucursal = () => {
  const empresaActual = useAppSelector((state) => (state.empresaReducer.empresa));
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(empresaActual){
      let serviceSucursal = new SucursalService();
      serviceSucursal.findByEmpresaId(empresaActual.id).then((data) => {
        setSucursales(data);
      });
    }
  }, [empresaActual]);

  const handleSucursalSelection = (value: string) => {
    dispatch(setSucursal(Number(value)));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Estadísticas
          </Typography>
        </Box>
        { sucursales &&
          <Box className="mb-4">
            <Form.Select onChange={(e) => handleSucursalSelection(e.target.value)}>
              { 
                sucursales.map((sucursal: Sucursal) => 
                  <option key={sucursal.id} value={String(sucursal.id)}>{sucursal.nombre}</option>
                )
              }
            </Form.Select>
          </Box>
        }
        <Box>
          <RankingProductosModule business="sucursal"/>
          <RecaudacionDiaria business="sucursal"/>
          <RecaudacionMensual business="sucursal"/>
          <CostosGanancias business="sucursal"/>
          <InformeExcel business="sucursal" />
        </Box>
      </Container>
    </Box>
  )
}
