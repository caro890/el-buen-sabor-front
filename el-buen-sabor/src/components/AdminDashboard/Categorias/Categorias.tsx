import { CategoriaService } from "../../../services/CatogoriaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";
import { setDataTable, removeElementActive } from "../../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";
import { Box, Typography, Container } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import { Categoria } from "../../../types/Articulos/Categoria";
import { BotonNuevo } from "../../Botones/BotonNuevo";
import { SucursalShort } from "../../../types/Empresas/Sucursal";

export const CategoriasCrud = () => {
  const dispatch = useAppDispatch();
  const service: CategoriaService = new CategoriaService();
  const sucursal = useAppSelector((state) => (state.sucursalReducer.sucursal));

  useEffect(() => {
    getCategorias();
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
    if (sucursal){
      await service.getAllBySucursalId(sucursal.id).then((data) => {
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
      if (result.isConfirmed && sucursal) {
        let sucursalShort: SucursalShort = {
          id: sucursal?.id,
          eliminado: sucursal?.eliminado,
          nombre: sucursal?.nombre
        }
        service.deleteById(id, sucursalShort).then(() => {
          getCategorias();
        });
      }
    });
  };

  const handleSelect = () => {
    dispatch(removeElementActive());
  }

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
        handleSelect={handleSelect}
        handleHabilitar={() => {}}>
      </GenericTable>
      </Container>
    </Box>
  )
}