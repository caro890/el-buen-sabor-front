import { FC, useEffect, useState } from "react";
import { Empresa } from "../../../types/Empresas/Empresa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

interface IPropsEmpresaForm {
    saveChanges: (emp: Empresa) => void;
    empresa: Empresa
}

const  validationSchema = Yup.object({
    nombre: Yup.string().required("Ingrese el nombre de la empresa"),
    razonSocial: Yup.string().required("Ingrese una razon social"),
    cuil: Yup.number().required("Ingrese el cuil"),
    logo: Yup.string()
});

export const EmpresaForm : FC<IPropsEmpresaForm> = ({saveChanges, empresa}) => {
  const formik = useFormik({
    initialValues: empresa,

    validationSchema: validationSchema,

    onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="nombre">
                <Form.Label>Nombre: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="nombre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                />
            </Form.Group>
            <Form.Group controlId="razonSocial">
                <Form.Label>Razon Social: </Form.Label>
                <Form.Control 
                    type="text"
                    name="razonSocial"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.razonSocial}
                />
            </Form.Group>
            <Form.Group controlId="cuit">
                <Form.Label>Cuit: </Form.Label>
                <Form.Control 
                    type="number" 
                    name="cuit"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cuit}
                />
            </Form.Group>
            <Form.Group controlId="logo">
                <Form.Label>Logo: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="logo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.logo}
                />
            </Form.Group>
        </Form>
    </div>
  )
}
