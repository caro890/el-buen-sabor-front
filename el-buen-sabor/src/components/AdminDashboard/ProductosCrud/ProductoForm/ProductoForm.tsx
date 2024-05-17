import { useLoaderData, useParams } from "react-router"
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useNavigate } from "react-router";
import { Form, Col, Row, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { categoriasLoader } from "../../CategoriasCrud/CategoriasCrud";
import { Categoria } from "../../../../types/Categoria";
import { unidadesMedidaLoader } from "../../UnidadesMedidaCrud/UnidadesMedidaCrud";
import { UnidadMedida } from "../../../../types/UnidadMedida";
import { ArticuloInsumo } from "../../../../types/ArticuloInsumo";
import { getInsumoPorId, insumosLoader } from "../../InsumosCrud/InsumosCrud";
import { ArticuloManufacturadoDetalle } from "../../../../types/ArticuloManufacturadoDetalle";
import { Provider } from "react-redux";
import { GenericModalSearch } from "../../GenericModalSearch/GenericModalSearch";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";



export const ProductoForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  const serviceInsumo: ArticuloInsumoService = new ArticuloInsumoService();

  const [ingredientes, setIngredientes] = useState<ArticuloInsumo[]>([]);
  const [producto, setProducto] = useState<ArticuloManufacturado>(new ArticuloManufacturado());
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
  const [txtValidacion, setTxtValidacion] = useState<string>("");


  let [idInsumo, setIdInsumo] = useState<string>("");
  let [cantidadInsumo, setCantidadInsumo] = useState<number>(0);

  //Estado  para controlar la ventana modals
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var p = data as ArticuloManufacturado;
        setProducto(p);
      });
    } else {
      setProducto(new ArticuloManufacturado());
    }
  }, []);


  //categorias
  useEffect(() => {
    const loadCategorias = async () => {
      const categorias = await categoriasLoader();
      setCategorias(categorias);
    };
    loadCategorias();
  }, []);


  //unidades Medida
  useEffect(() => {
    const loadUnidadesMedida = async () => {
      const unidadesMedida = await unidadesMedidaLoader();
      setUnidadesMedida(unidadesMedida);
    };
    loadUnidadesMedida();
  }, []);

  //insumos
  useEffect(() => {
    serviceInsumo.getInsumosParaElaborar().then((data) => {
      if(data) setInsumos(data);
    });
  }, []);


  const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState('');

  const handleInsumoSelectChange = (event: { target: { value: any; }; }) => {
    const selectedInsumoId = event.target.value;
    setIdInsumo(selectedInsumoId);
    const selectedInsumo = insumos.find((insumo) => insumo.id == selectedInsumoId);
    if (selectedInsumo && selectedInsumo.unidadMedida) {
      setUnidadMedidaSeleccionada(selectedInsumo.unidadMedida.denominacion.toString());
    } else {
      setUnidadMedidaSeleccionada('');
    }
  };

  const handleCategoriaChange = (event: { target: { value: any; }; }) => {
    const selectedCategoriaId = event.target.value;
    const selectedCategoria = categorias.find((cat) => cat.id == selectedCategoriaId);
    if (selectedCategoria && selectedCategoria.denominacion) {
      producto.categoria = selectedCategoria;
    };
  }

  const handleUnidadMedidaChange = (event: { target: { value: any; }; }) => {
    const selectedUnidadMedidaId = event.target.value;
    const selectedUnidadMedida = unidadesMedida.find((um) => um.id == selectedUnidadMedidaId);
    if (selectedUnidadMedida && selectedUnidadMedida.denominacion) {
      producto.unidadMedida = selectedUnidadMedida;
    };
  }

  //formulario
  const save = async () => {
    console.log(producto.denominacion);
    console.log(producto.descripcion);
    console.log(producto.precioVenta);
    console.log(producto.categoria.denominacion);
    console.log(producto.unidadMedida.denominacion);
    console.log(producto.preparacion);
    console.log(producto.tiempoEstimadoMinutos);
    console.log(producto.articuloManufacturadoDetalles);

    await service.post(producto);
  }

  const deleteIngrediente = async (art: ArticuloManufacturadoDetalle) => {

    if (producto.articuloManufacturadoDetalles) {
      let ings: ArticuloManufacturadoDetalle[] = await producto.articuloManufacturadoDetalles.filter(ing => ing.articuloInsumo.id != art.articuloInsumo.id);
      producto.articuloManufacturadoDetalles = await ings;
    }
    await setProducto(producto);
  }

  return (
    <Box component="main" sx={{flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            {`${id ? "Editar" : "Crear"} un producto`}
          </Typography>
          <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="denominacion">
              <Form.Label column sm={2}>
                Denominación
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Denominación" defaultValue={producto?.denominacion} onChange={e => producto.denominacion = String(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="descripcion">
              <Form.Label column sm={2}>
                Descripción
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="textarea" placeholder="Descripción" defaultValue={producto?.descripcion} onChange={e => producto.descripcion = String(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="precioVenta">
              <Form.Label column sm={2}>
                Precio de Venta
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" placeholder="Precio de venta" defaultValue={producto?.precioVenta} onChange={e => producto.precioVenta = parseFloat(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" selectid="categoria">
              <Form.Label column sm={2}>
                Categoría
              </Form.Label>
              <Col sm={10}>

                <Form.Select defaultValue={producto?.categoria.id} onChange={handleCategoriaChange}>
                  <option value="0">Elija una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.denominacion}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" selectid="unidadMedida">
              <Form.Label column sm={2}>
                Unidad de Medida
              </Form.Label>
              <Col sm={10}>
                <Form.Select defaultValue={producto?.unidadMedida.id} onChange={handleUnidadMedidaChange}>
                  <option value="0">Elija una unidad de medida</option>
                  {unidadesMedida.map((unidadMedida) => (
                    <option key={unidadMedida.id} value={unidadMedida.id}>
                      {unidadMedida.denominacion}
                    </option>
                  ))}
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
                <Form.Control as="textarea" placeholder="Preparación" defaultValue={producto?.preparacion} onChange={e => producto.preparacion = String(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="tiempoEstimadoMinutos">
              <Form.Label column sm={2}>
                Tiempo estimado de preparación
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" placeholder="Tiempo estimado de preparación" defaultValue={producto?.tiempoEstimadoMinutos} onChange={e => producto.tiempoEstimadoMinutos = parseFloat(e.target.value)} />
              </Col>
            </Form.Group>

            {/*Articulo Manufacturado detalle*/}
            <Form.Group as={Row} className="mb-4" controlId="articuloManufacturadoDetalles">
              <Form.Label column sm={2}>
                Ingredientes
              </Form.Label>
              <Col sm={3}>
                <Button type="button" onClick={() => {setOpenModal(true)}}>AÑADIR</Button>
              </Col>
              {producto.articuloManufacturadoDetalles?.map((art: ArticuloManufacturadoDetalle, index: number) =>
                <div className="row" key={index}>
                  <div className="col">
                    {art.articuloInsumo.denominacion}
                  </div>
                  <div className="col">
                    {art.cantidad}
                  </div>
                  <div className="col">
                    <button style={{ marginBottom: 10 }} className="btn btn-danger" onClick={(e) => deleteIngrediente(art)}>Eliminar</button>
                  </div>
                </div>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={save} type="button">CONFIRMAR</Button>
              </Col>
            </Form.Group>
          </Form>
        </Box>
        <GenericModalSearch open={openModal} handleClose={async () => {setOpenModal(false)}} options={insumos} setSelectedData={setIngredientes}></GenericModalSearch>
      </Container>
    </Box>
  )
}

