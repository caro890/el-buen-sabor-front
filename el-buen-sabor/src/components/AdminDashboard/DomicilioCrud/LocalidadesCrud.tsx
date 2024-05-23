import { useEffect } from "react";
import { useLoaderData/*, useNavigate*/ } from "react-router";
import { Form } from "react-bootstrap";
//import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import { LocalidadService } from "../../../services/LocalidadService";
import { Localidad } from "../../../types/Domicilio/Localidad";


export const LocalidadesCrud = () => {
  const localidades = useLoaderData() as Localidad[];
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  //const service: LocalidadService = new LocalidadService();

  useEffect(() => {
    dispatch(setDataTable(localidades));
  }, []);

  /*const getLocalidades = async () => {
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la localidad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).then(() => {
            getLocalidades();
        });
      }
    });
  };*/

  return (
    <>
      <div>Localidades Crud</div>



      <Form.Select>
        <option>Elija una localidad</option>
        {localidades.map((localidad) => (
          <option key={localidad.id} value={localidad.id}>
            {localidad.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const localidadesLoader = async () => {
  const service: LocalidadService = new LocalidadService();
  return service.getAll();
}

export const getLocalidadesPorProvinciaId = async (idProvincia: number) => {
  const service: LocalidadService = new LocalidadService();
  return service.findByProvinciaId(idProvincia);
};

