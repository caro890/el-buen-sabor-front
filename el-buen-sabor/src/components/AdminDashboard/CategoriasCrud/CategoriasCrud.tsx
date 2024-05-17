//import { useLoaderData } from "react-router"
//import { Categoria } from "../../../types/Categoria";
import { useLoaderData, useNavigate } from "react-router";
import { CategoriaService } from "../../../services/CatogoriaService";
import { Categoria } from "../../../types/Categoria";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";
import { Form, Col, Row, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";

export const CategoriasCrud = () => {
  //const categorias = useLoaderData() as Categoria[];
  const categorias = useLoaderData() as Categoria[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: CategoriaService = new CategoriaService();

  useEffect(() => {
    dispatch(setDataTable(categorias));
  }, []);

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
    <>
      <div>CategoriasCrud</div>



      <Form.Select>
        <option>Elija una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.denominacion}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const categoriasLoader = async () => {
  const service: CategoriaService = new CategoriaService();
  return service.getAll();
}
