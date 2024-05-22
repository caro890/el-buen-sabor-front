import { useLoaderData, useNavigate } from "react-router"
import { ArticuloInsumoService } from "../../../services/ArticuloInsumoService";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";
import { ArticuloInsumo } from "../../../types/Articulos/ArticuloInsumo";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import formatPrice from "../../../types/formats/priceFormat";
import formatCantidad from "../../../types/formats/stockCantidadFormat";
import formatBoolean from "../../../types/formats/booleanFormat";
import Swal from "sweetalert2";
import { GenericTable } from "../../GenericTable/GenericTable";
import { Box, Typography, Button, Container} from "@mui/material";
import CIcon from "@coreui/icons-react"
import { cilPlus } from "@coreui/icons"
import formatImage from "../../../types/formats/imageFormat";

export const InsumosCrud = () => {
  const insumos = useLoaderData() as ArticuloInsumo[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ArticuloInsumoService = new ArticuloInsumoService();

  useEffect(() => {
    dispatch(setDataTable(insumos));
  }, []);


  

  const columnsTableInsumos = [
    {
      label: "Denominacion",
      key: "denominacion"
    },
    {
      label: "Precio de Venta",
      key: "precioVenta",
      render: (insumo: ArticuloInsumo) => {
        return formatPrice(insumo.precioVenta);
      }
    },
    {
      label: "Imagenes",
      key: "imagenes",
      render: (insumo: ArticuloInsumo) => {
        if(insumo.imagenes){
          return formatImage(insumo.imagenes[0].url);
        } else {
          return "";
        }
      }
    },
    {
      label: "Unidad de Medida",
      key: "unidadMedida",
      render: (insumo: ArticuloInsumo) => {
        if(insumo.unidadMedida){
          return insumo.unidadMedida.denominacion;
        } else {
          return "";
        }
      }
    },
    {
      label: "Categoria",
      key: "categoria",
      render: (insumo: ArticuloInsumo) => {
        if(insumo.categoria){
          return insumo.categoria.denominacion;
        } else {
          return "";
        }
      }
    },
    {
      "label": "Precio Compra",
      "key": "precioCompra",
      render: (insumo: ArticuloInsumo) => {
        return formatPrice(insumo.precioCompra);
      }
    },
    {
      "label": "Stock Actual",
      "key": "stockActual",
      render: (insumo: ArticuloInsumo) => {
        return formatCantidad(insumo.stockActual, insumo.unidadMedida);
      }
    },
    {
      "label": "Stock Máximo",
      "key": "stockMaximo",
      render: (insumo: ArticuloInsumo) => {
        return formatCantidad(insumo.stockMaximo, insumo.unidadMedida);
      }
    },
    {
      "label": "Para elaboración",
      "key": "esParaElaborar",
      render: (insumo: ArticuloInsumo) => {
        return formatBoolean(insumo.esParaElaborar);
      }
    },
    {
      "label": "Acciones",
      "key": "acciones"
    }
  ]

  const getInsumos = async () => {
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
          getInsumos();
        });
      }
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Insumos
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
            onClick={() => {navigate("form")}}
          >
            NUEVO
          </Button>
        </Box>
        {/* Barra de búsqueda 
        <Box sx={{mt:2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>*/}
        <GenericTable<ArticuloInsumo> 
          handleDelete={handleDelete} 
          columns={columnsTableInsumos}
        ></GenericTable>
      </Container>
    </Box>
  )
}

//loader function
export const insumosLoader = async () => {
  const service: ArticuloInsumoService = new ArticuloInsumoService();
  return service.getAll();
}

export async function getInsumoPorId(id:string){
  let urlServer = 'http://localhost:8080/articulos/insumos/'+ id;
  let response = await fetch(urlServer, {
    method: 'GET',
        headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    },
        mode: 'cors'
  });
    return await response.json() as ArticuloInsumo;    
}