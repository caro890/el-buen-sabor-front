import { FC } from "react";
import { Empresa } from "../../../types/Empresas/Empresa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";

interface IPropsEmpresaForm {
    saveChanges: (emp: Empresa) => void;
    empresa: Empresa
}

const  validationSchema = Yup.object({
    nombre: Yup.string().required("Ingrese el nombre de la empresa"),
    razonSocial: Yup.string().required("Ingrese una razon social"),
    cuit: Yup.string().matches(RegExp(/^[0-9]/), "El cuit debe ser un número").required("Ingrese el cuit"),
    logo: Yup.string()
});

export const EmpresaForm : FC<IPropsEmpresaForm> = ({saveChanges, empresa}) => {
  const formik = useFormik({
    initialValues: empresa,

    validationSchema: validationSchema,

    onSubmit: (values) => {
        console.log(values);
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
                <Form.Control 
                    type="text" 
                    name="logo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.logo}
                />
                {formik.touched.logo && formik.errors.logo ? 
                    (<div className="text-danger"> {formik.errors.logo} </div>)
                    : null
                }
            </Form.Group>
            <Button type="submit" className="save-button" >GUARDAR</Button>
        </Form>
    </div>
  )
}
