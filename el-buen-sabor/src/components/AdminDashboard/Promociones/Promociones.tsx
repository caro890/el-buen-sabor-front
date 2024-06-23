import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useState, useEffect } from "react";
import { Promocion } from "../../../types/Articulos/Promocion";
import formatPrice from "../../../types/formats/priceFormat";
import { Box, Container, Typography } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import Swal from "sweetalert2";
import { PromocionDetalleModal } from "./Detalle/PromocionDetalleModal";
import { BotonNuevo } from "../../Botones/BotonNuevo";
import { PromocionService } from "../../../services/PromocionService";

export const Promociones = () => {
  const dispatch = useAppDispatch();
  const service = new PromocionService();
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  
  useEffect(() => {
    getPromociones();
  }, []);

  const columnsTablePromociones = [
    {
        label: "Denominación",
        key: "denominacion"
    },
    {
        label: "Inicio",
        key: "fechaDesde"
    },
    {
        label: "Fin",
        key: "fechaHasta"
    },
    {
        label: "Precio",
        key: "precioPromocional",
        render: (promo: Promocion) => {
            return formatPrice(promo.precioPromocional);
        }
    },
    {
        label: "Acciones",
        key: "acciones"
    },
    {
        label: "Habilitado",
        key: "btnHabilitar"
    }
  ];

  const getPromociones = async () => {
    console.log(idSucursal);
    if (idSucursal){
      await service.getAllBySucursalId(idSucursal).then((data) => {
        console.log(data);
        dispatch(setDataTable(data));
      });
    }
  }

  const handleDelete = (id: number) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Seguro que desea eliminar la promoción?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if(result.isConfirmed){
          service.delete(id).then(() => {
            getPromociones();
          });
        }
      });
  };

  const handleSelect = () => {
    setShowDetail(true);
  };

  const handleHabilitar = async (id: number) => {
    await service.changeHabilitadoState(id);
    getPromociones();
  };

  const handleClose = () => {
    setShowDetail(false);
    dispatch(removeElementActive());
  }

  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
            <Typography variant="h5" gutterBottom>
                Promociones
            </Typography>
            <BotonNuevo/>
        </Box>
        <GenericTable<Promocion> 
            handleDelete={handleDelete} 
            handleSelect={handleSelect}
            columns={columnsTablePromociones}
            handleHabilitar={handleHabilitar}>
        </GenericTable>
        </Container>
        <PromocionDetalleModal
            open={showDetail} 
            handleClose={handleClose} 
        />
</Box>
  )
}