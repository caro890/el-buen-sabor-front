import { useParams } from "react-router"
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useNavigate } from "react-router";
import { Form, Col, Row, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

export const ProductoForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();

  const [producto, setProducto] = useState<ArticuloManufacturado>();

  useEffect(() => {
    if(id){
      service.getById(Number(id)).then((data) => {
        var p = data as ArticuloManufacturado;
        setProducto(p);
      });
    } else {
      setProducto(new ArticuloManufacturado());
    }
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            {`${ id ? "Editar" : "Crear" } un producto`}
          </Typography>
          <Button type="button" onClick={() => {navigate("..")}} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)"}}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
        </Box>
        <Box sx={{textAlign: "left"}}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="denominacion">
            <Form.Label column sm={2}>
              Denominación
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Denominación" defaultValue={producto?.denominacion} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="descripcion">
            <Form.Label column sm={2}>
              Descripción
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" placeholder="Descripción" defaultValue={producto?.descripcion} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="precioVenta">
            <Form.Label column sm={2}>
              Precio de Venta
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" placeholder="Precio de venta" defaultValue={producto?.precioVenta} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" selectId="categoria">
            <Form.Label column sm={2}>
              Categoría
            </Form.Label>
            <Col sm={10}>
              <Form.Select>
                <option>Elija una categoría</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>  
          </Form.Group>

          <Form.Group as={Row} className="mb-4" selectId="unidadMedida">
            <Form.Label column sm={2}>
              Unidad de Medida
            </Form.Label>
            <Col sm={10}>
              <Form.Select>
                <option>Elija una unidad de medida </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>  
          </Form.Group>
          {/*}
          <Typography variant="h6" gutterBottom>
            Imagenes
          </Typography>

          <Form.Group as={Row} className="mb-4" controlId="imagenes">
            <Form.Label column sm={2}>
              Imagenes
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Imagen" />
            </Col>
          </Form.Group>
          */}
          <Typography variant="h6" gutterBottom>
            Preparación e ingredientes
          </Typography>

          <Form.Group as={Row} className="mb-3" controlId="preparacion">
            <Form.Label column sm={2}>
              Preparación
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" placeholder="Preparación" defaultValue={producto?.preparacion} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="tiempoEstimadoMinutos">
            <Form.Label column sm={2}>
              Tiempo estimado de preparación
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" placeholder="Tiempo estimado de preparación" defaultValue={producto?.tiempoEstimadoMinutos}/>
            </Col>
          </Form.Group>

          {/*Articulo Manufacturado detalle*/} 
          <Form.Group as={Row} className="mb-4" controlId="articuloManufacturadoDetalles">
            <Form.Label column sm={2}>
              Ingredientes
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <DropdownButton
                  variant="outline-secondary"
                  title="Dropdown"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
                <Form.Control type="number" placeholder="Cantidad" />
                <InputGroup.Text id="basic-addon2">unidad de medida</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col sm={3}>
              <Button type="button">AÑADIR</Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="button">CONFIRMAR</Button>
            </Col>
          </Form.Group>
        </Form>
        </Box>
        
      </Container>
    </Box>
  )
}


