import { IconButton, Typography } from "@mui/material"
import { Form, Col, Row, Button, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { LoaderFunction, useLoaderData, useNavigate } from "react-router"
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService"
import { ArticuloManufacturado } from "../../../../types/Articulos/ArticuloManufacturado"
import { UnidadMedida } from "../../../../types/Articulos/UnidadMedida"
import { Categoria } from "../../../../types/Articulos/Categoria"
import { unidadesMedidaLoader } from "../../UnidadesMedidaCrud/UnidadesMedidaCrud"
import { CategoriaService } from "../../../../services/CatogoriaService"
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo"
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService"
import { ArticuloManufacturadoDetalle } from "../../../../types/Articulos/ArticuloManufacturadoDetalle"
import * as Yup from "yup"
import { ModalInsumos } from "../ProductModalSearch/ModalInsumos"
import styles from "../../../../styles/ProductForm.module.css"
import CIcon from "@coreui/icons-react"
import { cilTrash, cilArrowLeft } from "@coreui/icons"

//esquemas de validacion para formik
const unidadMedidaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una unidad de medida")
});
  
const categoriaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una categoría")
});

const validationSchema = Yup.object().shape({
    codigo: Yup.string().required("Ingrese el código del prodcuto").matches(/^[M]/, 'El código debe empezar con una M mayúscula'),
    denominacion: Yup.string().required("Ingrese la denominación del producto"),
    descripcion: Yup.string().required("Ingrese una descripción"),
    precioVenta: Yup.number().required("Ingrese el precio de venta").moreThan(-1, "El precio debe ser un valor positivo"),
    unidadMedida: unidadMedidaValidation,
    categoria: categoriaValidation,
    preparacion: Yup.string().required("Ingrese la receta del producto"),
    tiempoEstimadoMinutos: Yup.number().required("Ingrese el tiempo estimado de preparación").moreThan(0, "El tiempo debe ser mayor a cero")
});

export const ProductoForm = () => {
  const navigate = useNavigate();
    //traigo el producto que me devolvió el loader
  const productoSeleccionado = useLoaderData() as ArticuloManufacturado;
 
  //servicio de articulos manufacturados
  const service = new ArticuloManufacturadoService();

  //estado para manejar el producto a crear o editar
  const [producto, setProducto] = useState<ArticuloManufacturado>(new ArticuloManufacturado());

  //estado para manejar los detalles
  const [detalles, setDetalles] = useState<ArticuloManufacturadoDetalle[]>([]);

  //estado para las unidades de medida
  const [unidades, setUnidades] = useState<UnidadMedida[]>([]);

  //estado para las categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  //estado para los insumos
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);

  //estado para manejar la apertura de la ventana modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //cargo las unidades de medida y las categorias
  useEffect(() => {
    unidadesMedidaLoader().then((data) =>
      setUnidades(data)
    );
    
    var serviceCat = new CategoriaService();
    serviceCat.getAllInsumo().then((data) =>
      setCategorias(data)
    );

    var serviceInsumo = new ArticuloInsumoService();
    serviceInsumo.getInsumosParaElaborar().then((data) => {
        setInsumos(data as ArticuloInsumo[])
    });
  }, []);

  //seteo el estado con el producto que recibi del loader
  useEffect(() => {
    setProducto(productoSeleccionado);
    setDetalles(productoSeleccionado.articuloManufacturadoDetalles);
  }, []);

  //cargo los insumos según los que ya estén en el producto
  /*useEffect(() => {
    
  }, [detalles]);*/

  //configuro formik
  const formik: any = useFormik({
    initialValues: productoSeleccionado,  
    validationSchema: validationSchema, 
    onSubmit: (values) => {
      //comprobar que los detalles no están vacíos y que las cantidades no sean cero
      if(detalles.length == 0 ){
        alert("Detalles vacíos");
        return;
      }
      var arrayAux: ArticuloManufacturadoDetalle[] = detalles.slice();
      var found = arrayAux.some(function (element) {
        return element.cantidad === 0;
      });
      if (found) {
        alert("Cantidad es 0");
        return;
      }

      //guardar
      values.articuloManufacturadoDetalles = detalles;
      if(values.id!=0) {
        service.put(values.id, values).then(() =>
          navigate("/dashboard/productos")
        )
      } else {
        service.post(values).then(() =>
          navigate("/dashboard/productos")
        )
      }
    }
  });

  //funcion para manejar el cambio en el input de cantidad
  const handleChangeAmount = (amount: any, detalle: ArticuloManufacturadoDetalle) => {
    try {
      if (amount > 0) {
        //busco el detalle en el arreglo
        var arrayAux: ArticuloManufacturadoDetalle[] = detalles.slice();
        var f: number = 0;
        var found = arrayAux.some(function (element, index) {
          f = index; return element.articuloInsumo === detalle.articuloInsumo;
        });
        //lo  obtengo del arreglo
        if (found) {
          var aux: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
          var newDetalle = arrayAux.splice(f, 1);
          
          newDetalle.forEach((item) => {
            aux.createFrom(item);
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

  //funcion para manejar la eliminacion de un insumo
  const handleDeleteInsumo = (detalle: ArticuloManufacturadoDetalle) => {
    var arrayAux: ArticuloManufacturadoDetalle[] = detalles.slice();
    var f: number = 0;
    var found = arrayAux.some(function (element, index) {
      f = index; return element.articuloInsumo === detalle.articuloInsumo;
    });
    if (found) {
      arrayAux.splice(f, 1);
      setDetalles(arrayAux);
    }
  };

  return (
    <div className={styles.mainBox}>
        <div className={styles.headerBox + " mb-3"}>
            <Typography variant="h5" gutterBottom>
                {`${producto.id!=0 ? "Editar" : "Crear"} un producto`}
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

                <Form.Group as={Row} className="mb-2" controlId="codigo">
                    <Form.Label column sm={2}>Código: </Form.Label>
                    <Col sm={10}>  
                        <Form.Control
                            type="text"
                            name="codigo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.codigo}
                        />
                    </Col>
                </Form.Group>
                {
                    formik.touched.codigo && formik.errors.codigo ?
                    (<div className="text-danger"> {formik.errors.codigo} </div>) : null
                }

                <Form.Group as={Row} className="mb-2" controlId="descripcion">
                    <Form.Label column sm={2}>Descripción: </Form.Label>
                    <Col sm={10}>  
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.descripcion}
                        />
                    </Col>
                </Form.Group>
                {
                    formik.touched.descripcion && formik.errors.descripcion ?
                    (<div className="text-danger"> {formik.errors.descripcion} </div>) : null
                }

                <Form.Group as={Row} className="mb-2" controlId="precioVenta">
                    <Form.Label column sm={2}>Precio Venta: </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number"
                            name="precioVenta"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.precioVenta}
                        />
                    </Col>
                </Form.Group>
                {
                    formik.touched.precioVenta && formik.errors.precioVenta ?
                    (<p className="text-danger"> {formik.errors.precioVenta} </p>) : null
                }

                <Form.Group as={Row} className="mb-2" controlId="unidadMedida.id">
                    <Form.Label column sm={2}>Unidad de medida: </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            name="unidadMedida.id"
                            value={formik.values.unidadMedida.id}
                            onChange={(event) => formik.setFieldValue('unidadMedida.id', event.target.value)}
                        >
                            <option>Seleccione una unidad de medida</option>
                            {unidades.map((unidad: UnidadMedida) => (
                                <option key={unidad.id} value={unidad.id}>
                                    {unidad.denominacion}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                {
                    formik.touched.unidadMedida && formik.errors.unidadMedida ?
                    (<div className="text-danger"> {formik.errors.unidadMedida.id} </div>) : null
                }

                <Form.Group as={Row} className="mb-3" controlId="categoria.id">
                    <Form.Label column sm={2}>Categoría: </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            name="categoria.id"
                            value={formik.values.categoria.id}
                            onChange={(event) => formik.setFieldValue('categoria.id', event.target.value)}
                        >
                            <option>Seleccione una categoria</option>
                                {categorias.map((categoria: Categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.denominacion}
                                    </option>
                                ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                {
                    formik.touched.categoria && formik.errors.categoria ?
                    (<div className="text-danger"> {formik.errors.categoria.id} </div>) : null
                }

                <Typography variant="h6" gutterBottom>
                    Preparación e ingredientes
                </Typography>

                <Form.Group as={Row} className="mb-2" controlId="preparacion">
                    <Form.Label column sm={2}>Preparación: </Form.Label>
                    <Col sm={10}>  
                        <Form.Control
                            as="textarea"
                            name="preparacion"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.preparacion}
                        />
                    </Col>
                </Form.Group>
                {
                    formik.touched.preparacion && formik.errors.preparacion ?
                    (<div className="text-danger"> {formik.errors.preparacion} </div>) : null
                }

                <Form.Group as={Row} className="mb-2" controlId="tiempoEstimadoMinutos">
                    <Form.Label column sm={2}>Tiempo estimado de preparación: </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number"
                            name="tiempoEstimadoMinutos"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tiempoEstimadoMinutos}
                        />
                    </Col>
                </Form.Group>
                {
                    formik.touched.tiempoEstimadoMinutos && formik.errors.tiempoEstimadoMinutos ?
                    (<div className="text-danger"> {formik.errors.tiempoEstimadoMinuto} </div>) : null
                }

                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm={2}>
                        Ingredientes
                    </Form.Label>
                    <Col sm={3}>
                        <Button type="button" className={styles.btnAdd} onClick={() => { setShowModal(true) }} >Añadir</Button>
                    </Col>
                </Form.Group>

                <Container>
                    {detalles?.map((art: ArticuloManufacturadoDetalle, index: number) =>
                        <Row key={index} className={styles.detalleRow + " mb-3"}>
                            <Col>
                                {art.articuloInsumo.denominacion}
                            </Col>
                            <Col>
                                <Form.Control className="mb-3" type="number" onChange={(e) => handleChangeAmount(e.target.value, art)}></Form.Control>
                            </Col>
                            <Col>
                                {art.cantidad} {art.articuloInsumo.unidadMedida.denominacion}
                            </Col>
                            <Col>
                                <IconButton className="mb-3" onClick={() => { handleDeleteInsumo(art) }}>
                                    <CIcon icon={cilTrash} size="lg" className="text-danger"></CIcon>
                                </IconButton>
                            </Col>
                            <span></span>
                        </Row>
                    )}
                </Container>
                <Button type="submit">GUARDAR</Button>
            </Form>
            <ModalInsumos 
                show={showModal}
                close={() => {setShowModal(false)}}
                add={(array: ArticuloManufacturadoDetalle[]) => setDetalles(array)} 
                options={insumos}
                array={detalles}
            />
        </div>
    </div>
  )
}

  type ReferralParams = {
    id?: string;
  };
  
  export const productoLoader: LoaderFunction = async ({params}) => {
    const { id } = params as ReferralParams;
    const service = new ArticuloManufacturadoService();
  
    if(id) {  //si recibo una id de la url, cargo el producto desde la api
      var res = await service.getById(Number(id));
      return res;
    } else {  //sino devuelvo un insumo vacio
      return new ArticuloManufacturado();
    }
  };