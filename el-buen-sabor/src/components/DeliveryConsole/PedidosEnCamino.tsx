import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux"
import { PedidoService } from "../../services/PedidoService";
import { PedidoDto } from "../../types/Pedido/Pedido";
import { PedidosTable } from "../PedidosTable/PedidosTable";
import { Container, Typography, Box } from "@mui/material";

export const PedidosEnCamino = () => {
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  const service = new PedidoService();
  const [pedidos, setPedidos] = useState<PedidoDto[]>([]);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = () =>{ 
    if(idSucursal) {
        service.getPedidosDelivery(1).then((data) => {
            setPedidos(data);
        });
    }
  };

  return (
    <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
            <Typography variant="h5" gutterBottom>
                Pedidos en Camino
            </Typography>
        </Box>
        <PedidosTable
            pedidos={pedidos}
            getPedidos={getPedidos}
        />
    </Container>
  )
}
