import { CategoriaService } from "../../../services/CatogoriaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";
import { Box, Typography, Container } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import { Categoria } from "../../../types/Articulos/Categoria";
import { BotonNuevo } from "../../Botones/BotonNuevo";
//import { LoaderFunction, useLoaderData } from "react-router";

export const CategoriasCrud = () => {
  //const loaderData = useLoaderData() as Categoria[];
  const dispatch = useAppDispatch();
  const service: CategoriaService = new CategoriaService();
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));

  useEffect(() => {
    getCategorias();
    //dispatch(setDataTable(loaderData));
  }, []);

  const columnsTableCategorias = [
    {
      label: "Denominación",
      key: "denominacion"
    },
    {
      label: "Categoría padre",
      key: "categoriaPadre",
      render: (categoria: Categoria) => {
        if (categoria.categoriaPadre) {
          return categoria.categoriaPadre.denominacion;
        } else {
          return "";
        }
      }
    },
    {
      label: "Acciones",
      key: "acciones"
    }
  ];

  const getCategorias = async () => {
    if (idSucursal){
      await service.getAllBySucursalId(idSucursal).then((data) => {
        dispatch(setDataTable(data));
      });
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).then(() => {
          getCategorias();
        });
      }
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Categorías
        </Typography>
        <BotonNuevo/>
      </Box>

      <GenericTable<Categoria>
        handleDelete={handleDelete}
        columns={columnsTableCategorias}
        handleSelect={() => {}}
        handleHabilitar={() => {}}>
      </GenericTable>
      </Container>
    </Box>
  )
}

/*export const loadCategorias: LoaderFunction = async () => {
  let service: CategoriaService = new CategoriaService();
  //let idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  localStorage.setItem("idSucursal", "1");
  let idSucursal: number = Number(localStorage.getItem("idSucursal"));
  let response: Categoria[] = [];

  if (idSucursal){
    response = await service.getAllBySucursalId(idSucursal);
  }

  return response;
}*/