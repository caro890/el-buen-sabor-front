import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LoaderFunction, useLoaderData } from "react-router"
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

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
  unidadMedida: {
    id: 0,
    eliminado: false,
    denominacion: ""
  },
  categoria: {
    id: 0,
    eliminado: false,
    denominacion: ""
  }
}

//esquemas de validacion para formik
const unidadMedidaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una unidad de medida")
});

const categoriaValidation = Yup.object().shape({
  id: Yup.number().required("Seleccione una denominacion")
});

const validationSchema = Yup.object().shape({
  denominacion: Yup.string().required("Ingrese la denominación del insumo"),
  precioVenta: Yup.number().positive("El precio debe ser un valor positivo"),
  precioCompra: Yup.number().required("Ingrese el precio de compra").positive("El precio debe ser un valor positivo"),
  stockActual: Yup.number().required("Ingrese el stock actual").positive("El stock debe ser un valor positivo"),
  stockMaximo: Yup.number().required("Ingrese el stock máximo").positive("El stock debe ser un valor positivo"),
  esParaElaborar: Yup.boolean().required("Seleccione si es para elaborar o para vender"),
  codigo: Yup.string().required("Ingrese el código del insumo").matches(/^[I]/, 'El código debe empezar con una I mayúscula'),
  unidadMedida: unidadMedidaValidation,
  categoria: categoriaValidation
});



export const InsumosForm = () => {
  //obtengo el insumo cargado por el loader
  const insumoSeleccionado = useLoaderData() as ArticuloInsumo;

  //estado para manejar el insumo a crear o editado
  const [insumo, setInsumo] = useState<ArticuloInsumo>(insumoVacio);

  //servicio de articulo insumos
  const service = new ArticuloInsumoService();

  //cargo el insumo en el estado
  useEffect(() => {
    setInsumo(insumoSeleccionado);
    console.log(insumo);
  }, []);

  //configuro formik
  const formik = useFormik({
    initialValues: insumoSeleccionado,  
    validationSchema: validationSchema, 
    onSubmit: (values) => {
      service.post(values);
    }
  });

  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
            {`${insumo.id!=0 ? "Editar" : "Crear"} un insumo`}
        </Typography>
      </div>
      <div>
        <Form onSubmit={formik.handleSubmit}>
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
  console.log(id);
  const service = new ArticuloInsumoService();

  if(id) {  //si recibo una id de la url, cargo el insumo desde la api
    service.getById(Number(id)).then((ins) => {
      return ins;
    }).catch((error) =>
      
      console.log(error)
    );
    return null;
  } else {  //sino devuelvo el insumo vacio
    return insumoVacio;
  }
};