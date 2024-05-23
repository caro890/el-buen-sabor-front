import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Sucursal } from "../../../types/Empresas/Sucursal";
import { Typography } from "@mui/material";

interface IPropsSucursalForm {
    saveChanges: (sucursal: Sucursal) => void;
    sucursal: Sucursal
}

const  validationSchema = Yup.object({
    nombre: Yup.string().required("Ingrese el nombre de la empresa"),

});

export const SucursalForm : FC<IPropsSucursalForm> = ({saveChanges, sucursal}) => {
  const formik = useFormik({
    initialValues: sucursal,

    validationSchema: validationSchema,

    onSubmit: (values) => {
        console.log(values);
        saveChanges(values);
    }
  });

  useEffect(() => {
    //obtener los paises
  }, []);

  return (
    <div>
        <Form onSubmit={formik.handleSubmit} className="empresa-form">
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
                  {formik.touched.nombre && formik.errors.nombre ? 
                    (<div className="text-danger"> {formik.errors.nombre} </div>)
                    : null
                  }
                </Col>
            </Form.Group>

            <Row>
                <Form.Group as={Col} className="mb-3" controlId="horarioApertura">
                    <Form.Label>Horario Apertura: </Form.Label>
                    <Form.Control 
                        type="time"
                        name="horarioApertura"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.horarioApertura}
                    />
                </Form.Group>
                    {formik.touched.horarioApertura && formik.errors.horarioApertura ? 
                        (<div className="text-danger"> {formik.errors.horarioApertura} </div>)
                        : null
                    }
                <Form.Group as={Col} className="mb-3" controlId="horarioCierre">
                    <Form.Label>Horario Cierre: </Form.Label>
                    <Form.Control 
                        type="time" 
                        name="horarioCierre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={String(formik.values.horarioCierre)}
                    />
                    {formik.touched.horarioCierre && formik.errors.horarioCierre ? 
                        (<div className="text-danger"> {formik.errors.horarioCierre} </div>)
                        : null
                    }
                </Form.Group>
            </Row>
            
            <Typography variant="h6" gutterBottom>
                Domicilio
            </Typography>
            <Form.Group as={Row} className="mb-2" controlId="calle">
                <Form.Label column sx={2}>Calle: </Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        type="text" 
                        name="calle"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.domicilio.calle}
                    />
                </Col>
                {formik.touched.domicilio?.calle && formik.errors.domicilio?.calle ? 
                    (<div className="text-danger"> {formik.errors.domicilio?.calle} </div>)
                    : null
                }
            </Form.Group>

            <Row>
                <Form.Group as={Col} className="mb-2" controlId="numero">
                    <Form.Label>Número: </Form.Label>
                    <Form.Control 
                        type="text"
                        name="numero"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.domicilio.numero}
                    />
                </Form.Group>
                    {formik.touched.domicilio?.numero && formik.errors.domicilio?.numero ? 
                        (<div className="text-danger"> {formik.errors.domicilio.numero} </div>)
                        : null
                    }
                <Form.Group as={Col} className="mb-2" controlId="cp">
                    <Form.Label>Código Postal: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name="cp"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={String(formik.values.domicilio.cp)}
                    />
                    {formik.touched.domicilio?.cp && formik.errors.domicilio?.cp ? 
                        (<div className="text-danger"> {formik.errors.domicilio.cp} </div>)
                        : null
                    }
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} className="mb-2" controlId="piso">
                    <Form.Label>Piso: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name="piso"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={String(formik.values.domicilio.piso)}
                    />
                    {formik.touched.domicilio?.piso && formik.errors.domicilio?.piso ? 
                        (<div className="text-danger"> {formik.errors.domicilio.piso} </div>)
                        : null
                    }
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId="nroDpto">
                    <Form.Label>Número de dpto: </Form.Label>
                    <Form.Control 
                        type="text"
                        name="nroDpto"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.domicilio.nroDpto}
                    />
                </Form.Group>
                    {formik.touched.domicilio?.nroDpto && formik.errors.domicilio?.nroDpto ? 
                        (<div className="text-danger"> {formik.errors.domicilio.nroDpto} </div>)
                        : null
                    }
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="pais">
                    <Form.Label>País</Form.Label>
                    <Form.Select name="pais" defaultValue="Choose...">
                        <option>Seleccione pais</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="provincia">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Select name="provincia" defaultValue="Choose...">
                        <option>Seleccione provincia</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="localidad">
                    <Form.Label name="localidad">Localidad</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Seleccione localidad</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Button type="submit" className="save-button" >GUARDAR</Button>
        </Form>
    </div>
  )
}
