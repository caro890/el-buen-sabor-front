import { LoaderFunction, useLoaderData, useNavigate } from "react-router";
import { Promocion, TipoPromocion } from "../../../../types/Articulos/Promocion";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import styles from "../../../../styles/ProductForm.module.css"
import * as Yup from "yup"
import { useEffect, useState } from "react";
import { PromocionDetalle, PromocionDetalleClass } from "../../../../types/Articulos/PromocionDetalle";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { IconButton } from "@mui/material";
import { cilTrash } from "@coreui/icons";
import { ModuloImagenes } from "../../../ModuloImagenes copy/ModuloImagenes2"

const validationSchema = Yup.object().shape({
  denominacion: Yup.string().required("Ingrese una denominación"),
  descripcionDescuento: Yup.string().required("Ingrese una descripción"),
  fechaDesde: Yup.date().required("Ingrese la fecha de inicio de la promoción"),
  fechaHasta: Yup.date().required("Ingrese la fecha de finalización de la promoción"),
  horaDesde: Yup.string().required("Ingrese la hora de inicio de la promoción"),
  horaHasta: Yup.string().required("Ingrese la hora de finalización de la promoción"),
  precioPromocional: Yup.number().moreThan(0,"El precio debe ser un valor positivo").required("Ingrese un precio")
});

export const PromocionForm = () => {
  const navigate = useNavigate();
  const promocionSeleccionada = useLoaderData() as Promocion; //promocion seleccionada para editar

  //const [promocion, setPromocion] = useState<Promocion>();  //promocion
  const [detalles, setDetalles] = useState<PromocionDetalle[]>(promocionSeleccionada.promocionDetalles);
  const [tipoPromo, setTipoPromo] = useState<boolean>(false); //manejar los cambios en tipo de promocion
  const [filesToUpload, setFilesToUpload] = useState<File[] | null>(null);  //manejar las imagenes nuevas para cargar

  //cargo los estados cuando cargo el componente
  useEffect(() => {
    //setPromocion(promocionSeleccionada);
    setDetalles(promocionSeleccionada.promocionDetalles);
    if(promocionSeleccionada.tipoPromocion=="HAPPY_HOUR") setTipoPromo(true);
  })

  //fornmik para manjear el formulario
  const formik: any = useFormik({
    initialValues: promocionSeleccionada,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //validar detalles

      let newTipoPromocion: TipoPromocion;
      if(tipoPromo){
        newTipoPromocion = TipoPromocion.HAPPY_HOUR;
      } else {
        newTipoPromocion = TipoPromocion.PROMOCION;
      }

      let newHoraDesde: Date = new Date('0000-00-00T'+values.horaDesde+':00Z');
      console.log(new Date(`2024-01-30T${values.horaDesde}:00Z`));
      let newHoraHasta: Date = new Date('0000-00-00T'+values.horaHasta+':00Z');

      let newPromocion: Promocion = {
        id:0,
        eliminado: false,
        denominacion: values.denominacion,
        fechaDesde: values.fechaDesde,
        fechaHasta: values.fechaHasta,
        habilitado: true,
        precioPromocional: values.precioPromocional,
        descripcionDescuento: values.descripcionDescuento,
        horaDesde: newHoraDesde,
        horaHasta: newHoraHasta,
        tipoPromocion: newTipoPromocion,
        promocionDetalles: detalles
      }

      console.log(newPromocion);
    }
  });

  //funcion para manejar el cambio en el input de cantidad
  const handleChangeAmount = (amount: any, detalle: PromocionDetalle) => {
    try {
      if (amount > 0) {
        //busco el detalle en el arreglo
        var arrayAux: PromocionDetalle[] = detalles.slice();
        var f: number = 0;
        var found = arrayAux.some(function (element, index) {
          f = index; return element.articulo === detalle.articulo;
        });
        //lo  obtengo del arreglo
        if (found) {
          var aux: PromocionDetalle = {
            id: 0,
            cantidad: 0,
            eliminado: false,
            articulo: detalle.articulo
          };
          var newDetalle = arrayAux.splice(f, 1);
          
          newDetalle.forEach((item) => {
            aux = PromocionDetalleClass.createFrom(item, aux);
          });
          aux.cantidad = amount;

          arrayAux.splice(f, 0, aux);
          setDetalles(arrayAux);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //funcion para manejar la eliminacion de un articulo
  const handleDeleteInsumo = (detalle: PromocionDetalle) => {
    var arrayAux: PromocionDetalle[] = detalles.slice();
    var f: number = 0;
    var found = arrayAux.some(function (element, index) {
      f = index; return element.articulo === detalle.articulo;
    });
    if (found) {
      arrayAux.splice(f, 1);
      setDetalles(arrayAux);
    }
  };

  //funcion para manejar el cambio del radio button de tipo de promocion
  const handleChangeTipoPromo = (value: string) => {
    if(value=="HAPPY_HOUR"){
      setTipoPromo(true);
    } else {
      setTipoPromo(false);
    }
  }

  return (
    <div className={styles.mainBox}>

      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
          {`${promocionSeleccionada?.id!=undefined ? "Editar" : "Crear"} un producto`}
        </Typography>
        <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
      </div>

      <div  className={styles.formBox}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-2" controlId="denominacion">
            <Form.Label column sm={2}>Denominación: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="denominacion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.denominacion}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.denominacion && formik.errors.denominacion ?
            (<div className="text-danger"> {formik.errors.denominacion} </div>) : null
          }

          <Form.Group as={Row} className="mb-2">
            <Form.Label as={Col}>Tipo de Promoción: </Form.Label>
            <Row>
              <Col sm={1}></Col>
              <Col>
                <Form.Check
                  type="radio"
                  name="HAPPY_HOUR"
                  radioGroup="tipoPromocion"
                  value="HAPPY_HOUR"
                  onChange={(e) => handleChangeTipoPromo(e.target.value)}
                  checked={tipoPromo}
                  label="Happy Hour"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={1}></Col>
              <Col>
                <Form.Check
                  type="radio"
                  name="PROMOCION"
                  radioGroup="tipoPromocion"
                  value="PROMOCION"
                  onChange={(e) => handleChangeTipoPromo(e.target.value)}
                  checked={!tipoPromo}
                  label="Promoción"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="descripcionDescuento">
            <Form.Label column sm={2}>Descripción: </Form.Label>
            <Col sm={10}>  
              <Form.Control
                as="textarea"
                name="descripcionDescuento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcionDescuento}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.descripcionDescuento && formik.errors.descripcionDescuento ?
            (<div className="text-danger"> {formik.errors.descripcionDescuento} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="precioPromocional">
            <Form.Label column sm={2}>Precio Venta: </Form.Label>
              <Col sm={10}>
                <Form.Control 
                  type="number"
                  name="precioPromocional"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.precioPromocional}
                />
              </Col>
          </Form.Group>
          {
            formik.touched.precioPromocional && formik.errors.precioPromocional ?
            (<p className="text-danger"> {formik.errors.precioPromocional} </p>) : null
          }
          
          <Typography variant="h6" gutterBottom>
            Inicio de promoción
          </Typography>
          <Row>
            <Form.Group as={Col} className="mb-2" controlId="fechaDesde">
              <Form.Label>Fecha: </Form.Label>
              <Form.Control
                type="date"
                name="fechaDesde"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaDesde}
              />
            </Form.Group>
            {formik.touched.fechaDesde && formik.errors.fechaDesde ?
              (<Col className="text-danger"> {formik.errors.fechaDesde} </Col>)
              : null
            }
            <Form.Group as={Col} className="mb-2" controlId="horaDesde">
              <Form.Label>Hora: </Form.Label>
              <Form.Control
                type="time"
                name="horaDesde"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.horaDesde}
              />
            </Form.Group>
            {formik.touched.horaDesde && formik.errors.horaDesde ?
              (<Col className="text-danger"> {formik.errors.horaDesde} </Col>)
              : null
            }
          </Row>

          <Typography variant="h6" gutterBottom>
            Fin de promoción
          </Typography>
          <Row>
            <Form.Group as={Col} className="mb-2" controlId="fechaHasta">
              <Form.Label>Fecha: </Form.Label>
              <Form.Control
                type="date"
                name="fechaHasta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaHasta}
              />
            </Form.Group>
            {formik.touched.fechaHasta && formik.errors.fechaHasta ?
              (<Col className="text-danger"> {formik.errors.fechaHasta} </Col>)
              : null
            }
            <Form.Group as={Col} className="mb-2" controlId="horaHasta">
              <Form.Label>Hora: </Form.Label>
              <Form.Control
                type="time"
                name="horaHasta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.horaHasta}
              />
            </Form.Group>
            {formik.touched.horaHasta && formik.errors.horaHasta ?
              (<Col className="text-danger"> {formik.errors.horaHasta} </Col>)
              : null
            }
          </Row>

          <Typography variant="h6" gutterBottom>
            Imágenes
          </Typography>
          <ModuloImagenes files={filesToUpload} setFiles={setFilesToUpload} imagenes={promocionSeleccionada.imagenes || []} ></ModuloImagenes>

          <Typography variant="h6" gutterBottom>
            Articulos
          </Typography>
          <Container>
            {
              detalles?.map((detalle: PromocionDetalle, index: number) => 
                <Row key={index} className={styles.detalleRow + " mb-3"}>
                  <Col>
                    {detalle.articulo.denominacion}
                  </Col>
                  <Col>
                    <Form.Control className="mb-3" type="number" onChange={(e) => handleChangeAmount(e.target.value, detalle)}></Form.Control>
                  </Col>
                  <Col>
                    {detalle.cantidad} {detalle.articulo.unidadMedida.denominacion}
                  </Col>
                  <Col>
                    <IconButton className="mb-3" onClick={() => { handleDeleteInsumo(detalle) }}>
                      <CIcon icon={cilTrash} size="lg" className="text-danger"></CIcon>
                    </IconButton>
                  </Col>
                </Row>
              )
            }
          </Container>

          <Button type="submit">GUARDAR</Button>
        </Form>
      </div>

    </div>
  )
}


type ReferralType = {
    id?: string
}

export const promocionLoader: LoaderFunction = async ({params}) => {
    const { id } = params as ReferralType;

    if(id) {
        /*
        let service = new PromocionService();
        let promocion: Promocion = await service.getById(id);
        return promocion;
        */
    } else {
        return {};
    }
}