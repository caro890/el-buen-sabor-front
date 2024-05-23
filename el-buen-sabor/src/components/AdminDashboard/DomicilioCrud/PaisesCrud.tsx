import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import { PaisService } from "../../../services/PaisService";
import { Pais } from "../../../types/Domicilio/Pais";


export const PaisesCrud = () => {
  const paises = useLoaderData() as Pais[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: PaisService = new PaisService();

  useEffect(() => {
    dispatch(setDataTable(paises));
  }, []);

  const getPaises = async () => {
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar el país?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).then(() => {
          getPaises();
        });
      }
    });
  };

  return (
    <>
      <div>Paises Crud</div>



      <Form.Select>
        <option>Elija un pais</option>
        {paises.map((pais) => (
          <option key={pais.id} value={pais.id}>
            {pais.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const paisesLoader = async () => {
  const service: PaisService = new PaisService();
  return service.getAll();
}
