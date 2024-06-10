import { LoaderFunction, useLoaderData, useNavigate } from "react-router"
import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer"
import { useAppDispatch } from "../../../hooks/redux";
import { useState, useEffect } from "react";
import { Promocion } from "../../../types/Articulos/Promocion";
import formatPrice from "../../../types/formats/priceFormat";
import formatDate from "../../../types/formats/dateFormat";
import { Box, Button, Typography } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { GenericTable } from "../../GenericTable/GenericTable";
import Swal from "sweetalert2";
import { PromocionDetalleModal } from "./DetalleModal/PromocionDetalleModal";

export const Promociones = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const promociones = useLoaderData() as Promocion[];
  //const service = new PromocionService();
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(setDataTable(promociones));
  }, []);

  const columnsTablePromociones = [
    {
        label: "Denominación",
        key: "denominacion"
    },
    {
        label: "Inicio",
        key: "fechaDesde",
        render: (promo: Promocion) => {
            return formatDate(promo.fechaDesde);
        }
    },
    {
        label: "Fin",
        key: "fechaHasta",
        render: (promo: Promocion) => {
            return formatDate(promo.fechaHasta);
        }
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
    /*await service.getAll().then((data) => {
        dispatch(setDataTable(data));
    });*/
  }

  const handleDelete = () => {
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
          //service.delete(id).then(() => {
            getPromociones();
          //});
        }
      });
  };

  const handleSelect = () => {
    setShowDetail(true);
  };

  const handleHabilitar = async (/*id: number*/) => {
    /*await service.changeHabilitadoState(id);*/
    getPromociones();
  };

  const handleClose = () => {
    setShowDetail(false);
    dispatch(removeElementActive());
  }

  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
            <Typography variant="h5" gutterBottom>
                Promociones
            </Typography>
            <Button
                sx={{
                    bgcolor: "#fb6376",
                    "&:hover": {
                        bgcolor: "#d73754",
                    },
                }}
                variant="contained"
                startIcon={<CIcon icon={cilPlus} size="lg"></CIcon>}
                onClick={() => navigate("form")}
            >
                NUEVO
            </Button>
        </Box>
        <GenericTable<Promocion> 
            handleDelete={handleDelete} 
            handleSelect={handleSelect}
            columns={columnsTablePromociones}
            handleHabilitar={handleHabilitar}>
        </GenericTable>
        <PromocionDetalleModal
            open={showDetail} 
            handleClose={handleClose} 
        />
</Box>
  )
}

export const promocionesLoader: LoaderFunction = () => {
    /*let service = new PromocionService();
    let promociones: Promocion[] = await service.getAll();
    return promociones;*/

    return [];
}