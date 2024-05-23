import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Form } from "react-bootstrap";
//import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import { DomicilioService } from "../../../services/DomicilioService";
import { Domicilio } from "../../../types/Domicilio/Domicilio";


export const DomicilioCrud = () => {
  const domicilios = useLoaderData() as Domicilio[];
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  //const service: DomicilioService = new DomicilioService();

  useEffect(() => {
    dispatch(setDataTable(domicilios));
  }, []);

  /*const getDomicilios = async () => {
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
  };*/

  /*const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar el domicilio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).then(() => {
            getDomicilios();
        });
      }
    });
  };*/

  return (
    <>
      <div>Domicilios Crud</div>



      <Form.Select>
        <option>Elija un domicilio</option>
        {domicilios.map((domicilio) => (
          <option key={domicilio.id} value={domicilio.id}>
            {domicilio.calle}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const domicilioLoader = async () => {
  const service: DomicilioService = new DomicilioService();
  return service.getAll();
}

export const createDomicilio = async(domicilio: Domicilio) =>{
    const service: DomicilioService = new DomicilioService();
    return service.post(domicilio);
}
