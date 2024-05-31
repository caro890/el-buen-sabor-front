import { useLoaderData, useNavigate } from "react-router"
import { ArticuloManufacturadoService } from "../../../services/ArticuloManufacturadoService"
import { GenericTable } from "../../GenericTable/GenericTable"
import { ArticuloManufacturado } from "../../../types/Articulos/ArticuloManufacturado"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer"
import Swal from "sweetalert2"
import formatPrice from "../../../types/formats/priceFormat"
import { Box, Typography, Button } from "@mui/material";
import CIcon from "@coreui/icons-react"
import { cilPlus } from "@coreui/icons"
import { ProductoDetailModal } from "./ProductoDetailModal/ProductoDetailModal"

export const ProductosCrud = () => {
  const productos = useLoaderData() as ArticuloManufacturado[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setDataTable(productos));
  }, []);

  const columnsTableProductos = [
    {
      label: "Código",
      key: "codigo"
    },
    {
      label: "Denominacion",
      key: "denominacion"
    },
    {
      label: "Precio de Venta",
      key: "precioVenta",
      render: (producto: ArticuloManufacturado) => {
        return formatPrice(producto.precioVenta);
      }
    },
    {
      label: "Categoria",
      key: "categoria",
      render: (producto: ArticuloManufacturado) => {
        if(producto.categoria){
          return producto.categoria.denominacion;
        } else {
          return "";
        }
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

  const getProductos = async () => {
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){
        service.delete(id).then(() => {
          getProductos();
        });
      }
    });
  };

  const handleSelect = () => {
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(false);
    dispatch(removeElementActive());
  }

  const handleHabilitar = async (id: number) => {
    await service.changeHabilitadoState(id);
    getProductos();
  }

  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Productos
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
        <GenericTable<ArticuloManufacturado> 
          handleDelete={handleDelete} 
          handleSelect={handleSelect}
          columns={columnsTableProductos}
          handleHabilitar={handleHabilitar}>
        </GenericTable>
        <ProductoDetailModal
          open={showDetail} 
          handleClose={handleClose} 
        />
    </Box>
  )
}

//loader function
export const productosLoader = async () => {
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  return service.getAll();
}
