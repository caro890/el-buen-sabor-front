import { Box, Typography } from "@mui/material"
import "../../../styles/AdminConsole.css"
import { Empresa } from "../../../types/Empresas/Empresa";
import { Card, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil, cilArrowLeft } from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import { EmptyCard } from "../EmptyCard/EmptyCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setActiveSucursal, setEmpresa } from "../../../redux/slices/EmpresaReducer";
import { SucursalForm } from "./SucursalForm";
import { Sucursal } from "../../../types/Empresas/Sucursal";
import { sucursalService } from "../../../services/SucursalService";

export const Sucursales = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //obtengo la empresa del estado global
  const empresa = useAppSelector((state) => state.empresaReducer.empresa) as Empresa;

  //sucursal vacia para utilizar en el formulario
  const sucursalVacia: Sucursal = {
    id: 0,
    eliminado: false,
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    domicilio: {
      id: 0,
      eliminado: false,
      calle: "",
      cp: 0,
      piso: 0,
      numero: 0,
      nroDpto: 0,
      localidad: {
        id: 0,
        eliminado: false,
        nombre: "",
        provincia: {
          id: 0,
          eliminado: false,
          nombre: "",
          pais: {
            id: 0,
            eliminado: false,
            nombre: "",
          }
        }
      }
    },
    empresa: empresa
  }

  //estado para manejar la lista de sucursales
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  
  //estado para manejar la apertura y cierre de la modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //estado para manejar la empresa a editar o la empresa nueva
  const [sucursalForm, setSucursalForm] = useState<Sucursal>(sucursalVacia);

  //servicio de sucursal para realizar las llamadas a la api
  const service = new sucursalService();

  useEffect(() => {
    //traigo las sucursales correspondientes a la empresa seleccionada
    service.getAll().then((lista) => {
      setSucursales(lista);
    });  
  }, [sucursalForm]);

  //funcion para manejar la eliminación de una sucursal
  const handleDelete = (id: number) => {
    //muestro una alerta para confirmar la eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la sucursal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){
        service.delete(id);

        //elimino la sucursal de la lista
        var auxArray: Sucursal[] = sucursales.slice();
        var index = 0;
        auxArray.forEach((emp, i) => {
          if(emp.id == id) index = i;
        });
        auxArray.splice(index, 1);
        setSucursales(auxArray);
      }
    });
  };

  //funcion que abre el modal para editar la sucursal
  const handleEdit = (e: Sucursal) => {
    setSucursalForm(e);  //seteo la sucursal a editar
    setShowModal(true); //muestro la ventana modal
  };

  //funcion para guardar la sucursal nueva o los cambio hechos en una
  const saveSucursal = (sucursal: Sucursal) => {
    //reemplazo la sucursal de la lista
    var auxArray: Sucursal[] = sucursales.slice();
  
    if(sucursal.id != 0) {
      var index = 0;
      auxArray.forEach((emp, i) => {
        if(emp.id == sucursal?.id) index = i;
      });
      auxArray.splice(index, 1);

      service.put(sucursal.id, sucursal);
    } else {
      service.post(sucursal);
    }

    auxArray.push(sucursal);
    setSucursales(auxArray);    

    handleClose();
  }

  const hanldeSucursalSelection = (sucursal: Sucursal) => {
    dispatch(setActiveSucursal(sucursal));
  };

  const handleClose = () => {
    setSucursalForm(sucursalVacia);
    setShowModal(false);
  };

  const handleReturn = () => {
    dispatch(setEmpresa(null));
    navigate("/admin-console");
  };

  return (
    <div>
      <Box className="title-box">
        <IconButton aria-label="volver" style={{border: 0, marginRight: "2rem"}} onClick={handleReturn}>
          <CIcon icon={cilArrowLeft} size="xl" className="text-dark"></CIcon>
        </IconButton>
        <Typography variant="h5" gutterBottom>
          ¿Qué sucursal desea ver?
        </Typography>
      </Box>
      <div className="d-flex flex-row card-container">
        <EmptyCard create={() => setShowModal(true)} item="sucursal" />

        {sucursales?.map((sucursal: Sucursal, index: number) => (
        <Card key={index} className="filled-card">
          <Card.Body as={Link} onClick={() => hanldeSucursalSelection(sucursal)} to={"/dashboard"} className="filled-card-body">
            <Card.Title>{sucursal.nombre}</Card.Title>
            <Card.Text>
              {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.localidad.nombre}, {sucursal.domicilio.localidad.provincia.nombre}, {sucursal.domicilio.localidad.provincia.pais.nombre}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <IconButton aria-label="editar" style={{backgroundColor: "var(--itemsColor)", marginRight: '2rem'}} onClick={() => handleEdit(sucursal)}>
              <CIcon icon={cilPencil} size="lg" />
            </IconButton>
            <IconButton aria-label="eliminar" style={{backgroundColor: "var(--itemsColor)"}} onClick={() => handleDelete(sucursal.id)}>
              <CIcon icon={cilTrash} size="lg" />
            </IconButton>
          </Card.Footer>
        </Card>
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>
            <SucursalForm saveChanges={saveSucursal} sucursal={sucursalForm}></SucursalForm>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SucursalForm saveChanges={saveSucursal} sucursal={sucursalForm}></SucursalForm>
        </Modal.Body>
      </Modal>
    </div>
  )
}
