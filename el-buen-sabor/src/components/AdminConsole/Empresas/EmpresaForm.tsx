import { FC, useEffect } from "react";
import { Empresa } from "../../../types/Empresas/Empresa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import { useImage } from "../../../hooks/useImage";
import { ModuloImagenes } from "../../ModuloImagenes copy/ModuloImagenes2 copy";

interface IPropsEmpresaForm {
    saveChanges: (emp: Empresa) => void;
    empresa: Empresa
}

const  validationSchema = Yup.object({
    nombre: Yup.string().required("Ingrese el nombre de la empresa"),
    razonSocial: Yup.string().required("Ingrese una razon social"),
    cuit: Yup.string().matches(RegExp(/[0-9]/), "El cuit debe ser un número").required("Ingrese el cuit")
});

export const EmpresaForm : FC<IPropsEmpresaForm> = ({saveChanges, empresa}) => {
  const img = useImage();

  useEffect(() => {
    setImagesConfig();
  }, []);
  
  const setImagesConfig = async () => {
    img.setObjUrl("images");
    if(empresa.logo) img.addToShowImages([{id: 0, eliminado: false, url: empresa.logo, name:""}]);
    else img.addToShowImages([]);
  };

  const formik = useFormik({
    initialValues: empresa,

    validationSchema: validationSchema,

    onSubmit: (values) => {
        try {
            img.uploadImages(values.id);
            //obtener imagen y agregarla a empleado(values)
            img.reset();
        } catch (error) {
            //Mostrar mensaje de error si ocurre una exepcion
            Swal.fire({
              title: "Error",
              text: "Algo falló al intentar subir las imágenes",
              icon: "error"
            });
            console.log("Error: ", error);
            return;
        }

        saveChanges(values);
    }
  });

  return (
    <div>
        <Form onSubmit={formik.handleSubmit} className="empresa-form">
            <Form.Group className="mb-2" controlId="nombre">
                <Form.Label>Nombre: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="nombre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                />
                {formik.touched.nombre && formik.errors.nombre ? 
                    (<div className="text-danger"> {formik.errors.nombre} </div>)
                    : null
                }
            </Form.Group>
            <Form.Group className="mb-2" controlId="razonSocial">
                <Form.Label>Razon Social: </Form.Label>
                <Form.Control 
                    type="text"
                    name="razonSocial"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.razonSocial}
                />
            </Form.Group>
                {formik.touched.razonSocial && formik.errors.razonSocial ? 
                    (<div className="text-danger"> {formik.errors.razonSocial} </div>)
                    : null
                }
            <Form.Group className="mb-2" controlId="cuit">
                <Form.Label>Cuit: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="cuit"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={String(formik.values.cuit)}
                />
                {formik.touched.cuit && formik.errors.cuit ? 
                    (<div className="text-danger"> {formik.errors.cuit} </div>)
                    : null
                }
            </Form.Group>
            <Form.Group className="mb-2" controlId="logo">
                <Form.Label>Logo: </Form.Label>
                <ModuloImagenes></ModuloImagenes>
            </Form.Group>
            <Button type="submit" className="save-button" >GUARDAR</Button>
        </Form>
    </div>
  )
}
