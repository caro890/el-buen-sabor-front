import { cilArrowLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Form } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import { UnidadMedidaService } from "../../../../services/UnidadMedidaService";
import { UnidadMedida } from "../../../../types/Articulos/UnidadMedida";


export const UnidadMedidaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const service: UnidadMedidaService = new UnidadMedidaService();

  const [unidadMedida, setUnidadMedida] = useState<UnidadMedida>(new UnidadMedida());

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var u = data as UnidadMedida;
        setUnidadMedida(u);
      }).catch((error) => console.log(error));
    } else {
        setUnidadMedida(new UnidadMedida());
    }
  }, []);

  
  //formulario
  const save = async () => {

   

    await service.post(unidadMedida);
    navigate('/dashboard/unidadMedidas');

  }

  return (
    <div className="w-100">
        <div className="header-box mb-3">
          <Typography variant="h5" gutterBottom>
            {`${id ? "Editar" : "Crear"} una unidad de medida`}
          </Typography>
          <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
        </div>
        
          <Form className="w-100" >
            <Form.Group as={Row} className="mb-3" controlId="denominacion">
              <Form.Label column sm={2}>
                Denominación
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="text" placeholder="Denominación" defaultValue={unidadMedida?.denominacion} onChange={e => unidadMedida.denominacion = String(e.target.value)} />
              </Col>
            </Form.Group>

          </Form>
    </div>  
  )
}
