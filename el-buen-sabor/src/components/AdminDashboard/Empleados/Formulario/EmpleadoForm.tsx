import { Typography } from "@mui/material"
import { Button, Form, Row, Col } from "react-bootstrap"
import { LoaderFunction, useLoaderData, useNavigate } from "react-router"
import { EmpleadoService } from "../../../../services/EmpleadoService"
import { Empleado, Rol } from "../../../../types/Empresas/Empleado";
import { useFormik } from "formik";
import * as Yup from "yup"
import styles from "../../../../styles/ProductForm.module.css"
import { empleadoVacio } from "../../../../types/TiposVacios";
import { BotonVolver } from "../../../Botones/BotonVolver";
import { useAppSelector } from "../../../../hooks/redux";
import { Sucursal } from "../../../../types/Empresas/Sucursal";

export const EmpleadoForm = () => {
  const navigate = useNavigate();   //hook para navegar entre rutas
  const service: EmpleadoService = new EmpleadoService();   //servicio para interactuar con la api
  const empleadoSeleccionado = useLoaderData() as Empleado;   //datos elegidos de la tabla para rellenar el form
  //sucursal actual
  const sucursal: Sucursal | null = useAppSelector((state) => (state.empresaReducer.activeSucursal));

  //Esquemas de validacion para formik
  const EMAIL_REGX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  const usuarioValidationSchema = Yup.object().shape({
    auth0Id: Yup.string().required("Ingrese la id de auth0 del usuario"),
    username: Yup.string().required("Ingrese un nombre de usuario"),
    email: Yup.string().required("Ingrese una dirección de correo electrónico").matches(EMAIL_REGX, "Dirección de correo inválida"),
    rol: Yup.mixed<Rol>().oneOf(Object.values(Rol)).required("Seleccione un rol")
  });

  const today: Date = new Date();
  today.setHours(0,0,0,0);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Ingrese el nombre"),
    apellido: Yup.string().required("Ingrese el apellido"),
    telefono: Yup.number().required("Ingrese el telefono").moreThan(0, "Telefono no válido"),
    fechaNacimiento: Yup.date().required("Ingrese la fecha de nacimiento")
      .max(today, "Ingrese una fecha de nacimiento válida"),
    usuario: usuarioValidationSchema
    //sucursal
  });

  //configuracion de formik
  const formik: any = useFormik({
    initialValues: empleadoSeleccionado,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let newEmpleado = values;
      if(sucursal!=null) newEmpleado.sucursal = sucursal;

      if(values.id!=0){
        newEmpleado = await service.put(values.id, newEmpleado);
      } else {
        newEmpleado = await service.post(newEmpleado);
      }

      console.log(newEmpleado);
      navigate(-1);
    }
  });

  return (
    <div className={styles.mainBox}>
      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
            {`${empleadoSeleccionado.id!=0 ? "Editar" : "Crear"} un empleado`}
        </Typography>
        <BotonVolver/>
      </div>
      <div className={styles.formBox}>
        <Form onSubmit={formik.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Datos Personales
          </Typography>
          <Form.Group as={Row} className="mb-2" controlId="nombre">
            <Form.Label column sm={2}>Nombre: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.nombre && formik.errors.nombre ?
            (<div className="text-danger"> {formik.errors.nombre} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="apellido">
            <Form.Label column sm={2}>Apellido: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.apellido && formik.errors.apellido ?
            (<div className="text-danger"> {formik.errors.apellido} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="telefono">
            <Form.Label column sm={2}>Teléfono: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="telefono"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.telefono && formik.errors.telefono ?
            (<p className="text-danger"> {formik.errors.telefono} </p>) : null
          }

          <Form.Group as={Row} className="mb-3" controlId="fechaNacimiento">
            <Form.Label column sm={2}>Fecha de Nacimiento: </Form.Label>
            <Col sm={10}>
            <Form.Control
                type="date"
                name="fechaNacimiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaNacimiento}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ?
            (<p className="text-danger"> {formik.errors.fechaNacimiento} </p>) : null
          }

          <Typography variant="h6" gutterBottom>
            Datos de Usuario
          </Typography>
          <Form.Group as={Row} className="mb-2" controlId="usuario.username">
            <Form.Label column sm={2}>Nombre de usuario:</Form.Label>
            <Col>
              <Form.Control 
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.username}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario.username && formik.errors.usuario.username ?
            (<p className="text-danger"> {formik.errors.usuario.username} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.email">
            <Form.Label column sm={2}>Dirección de correo electrónico:</Form.Label>
            <Col>
              <Form.Control 
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.email}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario.email && formik.errors.usuario.email ?
            (<p className="text-danger"> {formik.errors.usuario.email} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.auth0Id">
            <Form.Label column sm={2}>ID de Auth0:</Form.Label>
            <Col>
              <Form.Control 
                type="text"
                name="auth0Id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.auth0Id}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario.auth0Id && formik.errors.usuario.auth0Id ?
            (<p className="text-danger"> {formik.errors.usuario.auth0Id} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.rol">
            <Form.Label column sm={2}>Rol:</Form.Label>
            <Col>
              <Form.Select
                name="rol"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.rol}
              >
                <option value="NO_ROL">Seleccione un rol</option>
                <option value={Rol.GERENTE}>Gerente</option>
                <option value={Rol.COCINERO}>Cocinero</option>
                <option value={Rol.CAJERO}>Cajero</option>
                <option value={Rol.DELIVERY}>Delivery</option>
              </Form.Select>
            </Col>
          </Form.Group>
          {
            formik.touched.usuario.rol && formik.errors.usuario.rol ?
            (<p className="text-danger"> {formik.errors.usuario.rol} </p>) : null
          }

          <Button type="submit">GUARDAR</Button>
        </Form>
      </div>
    </div>
  )
}

type ReferralParams = {
    id?: string;
  };
  
export const empleadoLoader: LoaderFunction = async ({params}) => {
    const { id } = params as ReferralParams;
    const service = new EmpleadoService();
  
    if(id) {  //si recibo una id de la url, cargo desde la api
      var res = await service.getById(Number(id));
      return res;
    } else {  //sino devuelvo el empleado vacio
      return empleadoVacio;
    }
};
