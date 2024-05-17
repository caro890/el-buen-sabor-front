import { useLoaderData, useNavigate } from "react-router"
import { ArticuloManufacturadoService } from "../../../services/ArticuloManufacturadoService"
import { GenericTable } from "../../GenericTable/GenericTable"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"
import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import { setDataTable, setElementActive } from "../../../redux/slices/ProductosReducer"
import Swal from "sweetalert2"
import formatPrice from "../../../types/formats/priceFormat"
import { Box, Typography, Button, Container} from "@mui/material";
import CIcon from "@coreui/icons-react"
import { cilPlus } from "@coreui/icons"
//import formatImage from "../../../types/formats/imageFormat"

export const ProductosCrud = () => {
  const productos = useLoaderData() as ArticuloManufacturado[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();

  useEffect(() => {
    dispatch(setDataTable(productos));
  }, []);

  const columnsTableProductos = [
    {
      label: "Denominacion",
      key: "denominacion"
    },
    {
      label: "Código",
      key: "codigo"
    },
    {
      label: "Precio de Venta",
      key: "precioVenta",
      render: (producto: ArticuloManufacturado) => {
        return formatPrice(producto.precioVenta);
      }
    },
    // {
    //   label: "Imagenes",
    //   key: "imagenes",
    //   render: (producto: ArticuloManufacturado) => {
    //     if(producto.imagenes){
    //       return formatImage(producto.imagenes[0].url);
    //     } else {
    //       return "";
    //     }
    //   }
    // },
    {
      label: "Unidad de Medida",
      key: "unidadMedida",
      render: (producto: ArticuloManufacturado) => {
        if(producto.unidadMedida){
          return producto.unidadMedida.denominacion;
        } else {
          return "";
        }
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
      label: "Descripción",
      key: "descripcion"
    },
    {
      label: "Tiempo de Preparación",
      key: "tiempoEstimadoMinutos",
      render: (producto: ArticuloManufacturado) => {
        return producto.tiempoEstimadoMinutos+"'";
      }
    },
    {
      label: "Preparación",
      key: "preparacion"
    },
    {
      label: "Ingredientes",
      key: "articuloManufacturadoDetalle",
      render: (producto: ArticuloManufacturado) => {
        var ingredientes: string = "";
        producto.articuloManufacturadoDetalles.forEach ( (item) => {
          ingredientes += item.articuloInsumo.denominacion + " ";
        });
        return ingredientes;
      }
    },
    {
      label: "Acciones",
      key: "acciones"
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

  const handleCreate = () => {
    var el: ArticuloManufacturado = new ArticuloManufacturado();
    navigate("form");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
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
            onClick={handleCreate}
          >
            NUEVO
          </Button>
        </Box>
        {/* Barra de búsqueda 
        <Box sx={{mt:2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>*/}
        <GenericTable<ArticuloManufacturado> 
          handleDelete={handleDelete} 
          columns={columnsTableProductos}>
        </GenericTable>
      </Container>
    </Box>
  )
}

//loader function
export const productosLoader = async () => {
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  return service.getAll();
}
/*
export async function getProductoPorId(id:string){
  let urlServer = 'http://localhost:8080/articulos/manufacturados/'+ id;
  let response = await fetch(urlServer, {
    method: 'GET',
        headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    },
        mode: 'cors'
  });
    return await response.json() as ArticuloManufacturado;    
}

export async function saveProducto(producto?: ArticuloManufacturado) {
	let urlServer = 'http://localhost:8080/articulos/manufacturados';
	let method:string = "POST";
	if(producto && producto.id > 0){
		urlServer = 'http://localhost:8080/articulos/manufacturados/' + producto.id;
		method = "PUT";
	}
	await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(producto),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
}*/