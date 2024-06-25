import { useAppSelector } from "../../../hooks/redux"
import { Box, Container, Typography, Paper, TableContainer, 
    Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { PedidoDto } from "../../../types/Pedido/Pedido";
import { PedidoService } from "../../../services/PedidoService";
import { useState, useEffect } from "react";
import styles from "../../../styles/GenericTable.module.css"
import formatPrice from "../../../types/formats/priceFormat";
import { Form } from "react-bootstrap";

export const Pedidos = () => {
  const service: PedidoService = new PedidoService();   //servicio para interactuar con la api
  const [pedidos, setPedidos] = useState<PedidoDto[]>([]);    //estado para el contenido de la tabla

  //id de la sucursal actual
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  
  useEffect(()=>{
    getPedidos();
  }, []);

  //función para obtener los datos a mostrar
  const getPedidos = async () => {
    if (idSucursal) {
      let response: PedidoDto[] = await service.getAllBySucursalId(idSucursal);
      setPedidos(response);
    };
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Función para cambiar de página
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Función para cambiar el número de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Estado para almacenar las filas de la tabla
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setRows(pedidos);
  }, [pedidos]);

  const handleChangeEstado = async (idPedido: number, estado: string) => {
    await service.changeEstadoPedido(idPedido, estado);
    getPedidos();
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Stock
        </Typography>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                      <TableCell align={"center"}>
                        ID
                      </TableCell>
                      <TableCell align={"center"}>
                        Fecha
                      </TableCell>
                      <TableCell align={"center"}>
                        Cliente
                      </TableCell>
                      <TableCell align={"center"}>
                        Tipo de Envío
                      </TableCell>
                      <TableCell align={"center"}>
                        Forma de Pago
                      </TableCell>
                      <TableCell align={"center"}>
                        Total
                      </TableCell>
                      <TableCell align={"center"}>
                        Cambiar Estado
                      </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {Array.isArray(rows) && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index: number) => {
                        return(
                            <TableRow className={styles.row} hover role="checkbox" tabIndex={-1} key={index} >
                                <TableCell align="center">
                                  {row["id"]}
                                </TableCell>
                                <TableCell align="center">
                                  {row["fechaPedido"]}
                                </TableCell>
                                <TableCell align="center">
                                  {row["cliente"].nombre+" "+row["cliente"].apellido}
                                </TableCell>
                                <TableCell align="center">
                                  {row["tipoEnvio"].toString()}
                                </TableCell>
                                <TableCell align="center">
                                  {row["formaPago"].toString()}
                                </TableCell>
                                <TableCell align="center">
                                  {formatPrice(row["total"])}
                                </TableCell>
                                <TableCell align={"center"}>
                                  <Form.Select value={row["estadoPedido"].toString()} onChange={(e) => handleChangeEstado(row["id"], e.target.value)}>
                                    <option value="PENDIENTE_PAGO">Pago Pendiente</option>
                                    <option value="PAGADO">Pagado</option>
                                    <option value="PREPARACION">En Preparación</option>
                                    <option value="PENDIENTE_ENTREGA">Entrega Pendiente</option>
                                    <option value="EN_CAMINO">En camino</option>
                                    <option value="CANCELADO">Cancelado</option>
                                    <option value="NOTA_CREDITO">Nota crédito</option>
                                    <option value="COMPLETADO">Completado</option>
                                  </Form.Select>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Container>
    </Box>
  )
}
