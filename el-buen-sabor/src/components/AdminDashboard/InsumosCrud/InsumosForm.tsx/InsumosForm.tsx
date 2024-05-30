import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { LoaderFunction, useLoaderData } from "react-router"
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { UnidadMedida } from "../../../../types/Articulos/UnidadMedida";
import { Categoria } from "../../../../types/Articulos/Categoria";
import { unidadesMedidaLoader } from "../../UnidadesMedidaCrud/UnidadesMedidaCrud";
import styles from "../../../../styles/InsumosForm.module.css"
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useNavigate } from "react-router";
import { CategoriaService } from "../../../../services/CatogoriaService";

//objeto de insumo vacio
const insumoVacio = {
  id: 0,
  eliminado: false,
  denominacion: "",
  precioVenta: 0,
  precioCompra: 0,
  stockActual: 0,
  stockMaximo: 0,
  esParaElaborar: false,
  codigo: "",
  imagenes: [],
  unidadMedida: {
    id: 0,
    eliminado: false,
    denominacion: ""
  },
  categoria: {
    id: 0,
    eliminado: false,
    denominacion: "",
    esInsumo: true
  }
}

//esquemas de validacion para formik
const unidadMedidaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una unidad de medida")
});

const categoriaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una categoría")
});

const validationSchema = Yup.object().shape({
  denominacion: Yup.string().required("Ingrese la denominación del insumo"),
  precioVenta: Yup.number().moreThan(-1, "El precio debe ser un valor positivo"),
  precioCompra: Yup.number().required("Ingrese el precio de compra").positive("El precio debe ser un valor positivo"),
  stockActual: Yup.number().required("Ingrese el stock actual").moreThan(-1, "El stock debe ser un valor positivo"),
  stockMaximo: Yup.number().required("Ingrese el stock máximo").moreThan(-1, "El stock debe ser un valor positivo"),
  esParaElaborar: Yup.boolean().required("Seleccione si es para elaborar o para vender"),
  codigo: Yup.string().required("Ingrese el código del insumo").matches(/^[I]/, 'El código debe empezar con una I mayúscula'),
  unidadMedida: unidadMedidaValidation,
  categoria: categoriaValidation
});



export const InsumosForm = () => {
  const navigate = useNavigate();

  //obtengo el insumo cargado por el loader
  const insumoSeleccionado = useLoaderData() as ArticuloInsumo;

  //estado para manejar el insumo a crear o editado
  const [insumo, setInsumo] = useState<ArticuloInsumo>(insumoVacio);

  //estado para las unidades de medida
  const [unidades, setUnidades] = useState<UnidadMedida[]>([]);

  //estado para las categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  //servicio de articulo insumos
  const service = new ArticuloInsumoService();
  //servicio de categoria
  const serviceCat = new CategoriaService();

  //cargo el insumo en el estado
  useEffect(() => {
    setInsumo(insumoSeleccionado);
  }, []);

  //cargo las unidades de medida y las categorias
  useEffect(() => {
    unidadesMedidaLoader().then((data) =>
      setUnidades(data)
    )
    
    serviceCat.getAllInsumo().then((data) =>
      setCategorias(data)
    )
  }, []);

  //configuro formik
  const formik: any = useFormik({
    initialValues: insumoSeleccionado,  
    validationSchema: validationSchema, 
    onSubmit: (values) => {
      if(values.id!=0) {
        service.put(values.id, values).then(() =>
          navigate("/dashboard/insumos")
        )
      } else {
        service.post(values).then(() =>
          navigate("/dashboard/insumos")
        )
      }
    }
  });

  return (
    <div className={styles.mainBox}>
      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
            {`${insumo.id!=0 ? "Editar" : "Crear"} un insumo`}
        </Typography>
        <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
      </div>
      <div className={styles.formBox}>
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

          <Form.Group as={Row} className="mb-2" controlId="precioCompra">
            <Form.Label column sm={2}>Precio Compra: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="precioCompra"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precioCompra}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.precioCompra && formik.errors.precioCompra ?
            (<div className="text-danger"> {formik.errors.precioCompra} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="stockActual">
            <Form.Label column sm={2}>Stock Actual: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="stockActual"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stockActual}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.stockActual && formik.errors.stockActual ?
            (<div className="text-danger"> {formik.errors.stockActual} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="stockMaximo">
            <Form.Label column sm={2}>Stock Maximo: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="stockMaximo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stockMaximo}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.stockMaximo && formik.errors.stockMaximo ?
            (<div className="text-danger"> {formik.errors.stockMaximo} </div>) : null
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

          <Form.Group as={Row} className="mb-2" controlId="categoria.id">
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

          <Form.Group as={Row} className="mb-2" controlId="esParaElaborar">
            <Col>
              <Form.Check
                type="checkbox"
                name="esParaElaborar"
                checked={formik.values.esParaElaborar}
                label="Es para elaboración"
                onChange={(event) => formik.setFieldValue('esParaElaborar', event.target.checked)}
              />
            </Col>
          </Form.Group>
          
          <Button type="submit">GUARDAR</Button>
        </Form>
      </div>
    </div>
  )
}

type ReferralParams = {
  id?: string;
};

export const insumoLoader: LoaderFunction = async ({params}) => {
  const { id } = params as ReferralParams;
  const service = new ArticuloInsumoService();

  if(id) {  //si recibo una id de la url, cargo el insumo desde la api
    var res = await service.getById(Number(id));
    return res;
  } else {  //sino devuelvo el insumo vacio
    return insumoVacio;
  }
};