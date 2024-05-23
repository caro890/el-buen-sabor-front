import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
import { ProvinciaService } from "../../../services/ProvinciaService";
import { Provincia } from "../../../types/Domicilio/Provincia";


export const ProvinciasCrud = () => {
  const provincias = useLoaderData() as Provincia[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ProvinciaService = new ProvinciaService();

  useEffect(() => {
    dispatch(setDataTable(provincias));
  }, []);

  const getProvincias = async () => {
    await service.getAll().then((data) => {
      dispatch(setDataTable(data));
    });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la provincia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).then(() => {
            getProvincias();
        });
      }
    });
  };

  return (
    <>
      <div>Provincias Crud</div>



      <Form.Select>
        <option>Elija una provincia</option>
        {provincias.map((provincia) => (
          <option key={provincia.id} value={provincia.id}>
            {provincia.nombre}
          </option>
        ))}
      </Form.Select>
    </>
  )
}


//loader function
export const provinciasLoader = async () => {
  const service: ProvinciaService = new ProvinciaService();
  return service.getAll();
}

export const getProvinciasPorPaisId = async (idPais: number) => {
  const service: ProvinciaService = new ProvinciaService();
  return service.findByPaisId(idPais);
};

