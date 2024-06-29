import { Paper, TableContainer, 
    Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useState, useEffect, FC } from "react";
import formatPrice from "../../types/formats/priceFormat";
import { PedidoService } from "../../services/PedidoService";
import { PedidoDto } from "../../types/Pedido/Pedido";
import { EstadoSelect } from "./EstadoSelect";
import { useAppDispatch } from "../../hooks/redux";
import { setElementActive } from "../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";

interface IPropsPedidosTable {
  pedidos: PedidoDto[],
  getPedidos: () => void,
  handleSelection: () => void,
}

export const PedidosTable : FC<IPropsPedidosTable> = ({
    pedidos,
    getPedidos,
    handleSelection
}) => {
  const dispatch = useAppDispatch();
    const service = new PedidoService();
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
      Swal.fire({
        title: `Cambiar estado a ${estado}`,
        text: `¿Desea cambiar el estado del pedido ${idPedido} a ${estado}?`,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Si, Cambiar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if(result.isConfirmed) {
          deactivateRow(idPedido);
          service.changeEstadoPedido(idPedido, estado).then(() => {
            getPedidos();
            activateRow(idPedido);
          });
        }
      })
    }  

    const deactivateRow = (id: number) => {
      let row = document.getElementById(String(id));
      row?.setAttribute("style", "cursor: not-allowed; background-color: #e7eaee");
      let select = document.getElementById(`select-${id}`);
      select?.setAttribute("disabled", "true");
      select?.setAttribute("style", "cursor: not-allowed");
    }

    const activateRow = (id: number) => {
      try {
        let row = document.getElementById(String(id));
        row?.setAttribute("style", "cursor: default; background-color: white");
        let select = document.getElementById(`select-${id}`);
        select?.removeAttribute("disabled");
        select?.setAttribute("style", "cursor: default");
      } catch(error) {
        console.log(error);
      }
    }

    const getNextEstados = async (idPedido: number) => {
      return await service.getEstadosPosibles(idPedido);
    }

    const handleRowSelection = (row: any) => {
      dispatch(setElementActive({element: row}));
      handleSelection();
    }

  return (
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
                    .map((row) => {
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1} key={row["id"]} id={String(row["id"])}>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {row["id"]}
                                </TableCell>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {row["fechaPedido"]}
                                </TableCell>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {row["cliente"]?.nombre+" "+row["cliente"]?.apellido}
                                </TableCell>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {row["tipoEnvio"]?.toString()}
                                </TableCell>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {row["formaPago"]?.toString()}
                                </TableCell>
                                <TableCell align="center" onClick={() => handleRowSelection(row)}>
                                  {formatPrice(row["total"])}
                                </TableCell>
                                <TableCell align={"center"}>
                                  <EstadoSelect 
                                    itemActual={{id: row["id"], estado: row["estadoPedido"]}}
                                    handleChangeEstado={handleChangeEstado}
                                    nextEstados={getNextEstados(row["id"])}
                                  />
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
  )
}
