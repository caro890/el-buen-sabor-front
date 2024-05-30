import { useLoaderData, useNavigate } from "react-router"
import { CategoriaService } from "../../../services/CatogoriaService";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";
import { cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Box, Typography, Button } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import { Categoria } from "../../../types/Articulos/Categoria";

export const CategoriasCrud = () => {
  const categorias = useLoaderData() as Categoria[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: CategoriaService = new CategoriaService();

  useEffect(() => {
    dispatch(setDataTable(categorias));
  }, []);

  const columnsTableCategorias = [
    {
      label: "Denominacion",
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
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Categorías
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

      <GenericTable<Categoria>
        handleDelete={handleDelete}
        columns={columnsTableCategorias}>
      </GenericTable>

    </Box>
  )
}


export const categoriasLoader = async () => {
  const service: CategoriaService = new CategoriaService();
  return service.getAll();
}
