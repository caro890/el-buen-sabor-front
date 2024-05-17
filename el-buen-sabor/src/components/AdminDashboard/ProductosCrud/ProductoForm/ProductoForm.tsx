import { useParams } from "react-router"
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import { useAppDispatch } from "../../../../hooks/redux";
import { useNavigate } from "react-router";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { categoriasLoader } from "../../CategoriasCrud/CategoriasCrud";
import { Categoria } from "../../../../types/Categoria";
import { unidadesMedidaLoader } from "../../UnidadesMedidaCrud/UnidadesMedidaCrud";
import { UnidadMedida } from "../../../../types/UnidadMedida";
import { ArticuloInsumo } from "../../../../types/ArticuloInsumo";
import { ArticuloManufacturadoDetalle } from "../../../../types/ArticuloManufacturadoDetalle";
import { GenericModalSearch } from "../../GenericModalSearch/GenericModalSearch";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";

export const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  const serviceInsumo: ArticuloInsumoService = new ArticuloInsumoService();

  const [ingredientes, setIngredientes] = useState<ArticuloInsumo[]>([]);
  const [detalles, setDetalles] = useState<ArticuloManufacturadoDetalle[]>([]);
  const [producto, setProducto] = useState<ArticuloManufacturado>(new ArticuloManufacturado());
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
  const [txtValidacion, setTxtValidacion] = useState<string>("");


  let [idInsumo, setIdInsumo] = useState<string>("");
  let [cantidadInsumo, setCantidadInsumo] = useState<number>(0);

  //Estado  para controlar la ventana modals
<<<<<<< Updated upstream
  const [openModal, setOpenModal] = useState<boolean>(false);
=======
  const [openModal, setOpenModal] = useState<boolean>(false);  const [unidadMedidaSelected, setUnidadMedidaSelected] = useState('');

  const [categoriaSelected, setCategoriaSelected] = useState('');
  const [precioVentaSelected, setPrecioVentaSelected] = useState(0);
  const [tiempoEstimadoSelected, setTiempoEstimadoSelected] = useState(0);
  const [codigoSelected, setCodigoSelected] = useState('');
>>>>>>> Stashed changes

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var p = data as ArticuloManufacturado;
        setProducto(p);
<<<<<<< Updated upstream
=======
        setUnidadMedidaSelected(p.unidadMedida.id.toString());
        setCategoriaSelected(p.categoria.id.toString());
        setPrecioVentaSelected(p.precioVenta);
        setTiempoEstimadoSelected(p.tiempoEstimadoMinutos);
        setCodigoSelected(p.codigo.replace(/\D/g, ""));
        setDetalles(p.articuloManufacturadoDetalles);
>>>>>>> Stashed changes
      });
    } else {
      setProducto(new ArticuloManufacturado());
    }
  }, []);

  //ingredientes
  useEffect(() => {
    var auxArray: ArticuloInsumo[] = [];
    producto.articuloManufacturadoDetalles.forEach((detalle: ArticuloManufacturadoDetalle) => {
      var aux: ArticuloInsumo = new ArticuloInsumo();
      aux = detalle.articuloInsumo;
      auxArray.push(aux);
    });
    setIngredientes(auxArray);
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

  //useEffect para atender los cambios en ingredientes
  useEffect(() => {
    var arrayAux = detalles.slice(); //copio el array de detalles
    ingredientes.forEach( (ingrediente, index) => { //para cada insumo en ingredientes
      //lo busco en el array de detalles
      var f = 0;
      var found = arrayAux.some(function(element, index) { f = index; return element.articuloInsumo.id == ingrediente.id; });

      if(!found){ //si no existe, lo voy a agregar
        //creo un nuevo detalle de articulo manufacturado
        var aux: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle(); 
        aux.articuloInsumo = ingrediente; //seteo el articulo insumo
        arrayAux.push(aux); //lo agrego al array auxiliar
      }
    });
    producto.articuloManufacturadoDetalles = arrayAux; //defino el array de detalles de producto
    setDetalles(arrayAux);  //seteo el estado de detalles con el array auxiliar
  }, [ingredientes])

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
<<<<<<< Updated upstream
    console.log(producto.denominacion);
=======
    if (producto.denominacion == "" || producto.codigo == "" || producto.descripcion == "" || producto.precioVenta == 0 || producto.categoria.id == 0 || producto.unidadMedida.id == 0 || producto.preparacion == "" || producto.tiempoEstimadoMinutos == 0 || producto.articuloManufacturadoDetalles.length == 0) {
      alert("Falta completar campos");
      return;
    }

    /*console.log(producto.denominacion);
    console.log(producto.codigo);
>>>>>>> Stashed changes
    console.log(producto.descripcion);
    console.log(producto.precioVenta);
    console.log(producto.categoria.denominacion);
    console.log(producto.unidadMedida.denominacion);
    console.log(producto.preparacion);
    console.log(producto.tiempoEstimadoMinutos);
    console.log(producto.articuloManufacturadoDetalles);*/


    await service.post(producto);
<<<<<<< Updated upstream
=======
    navigate('/dashboard/productos');

  }

  //funcion para borrar un detalle
  const deleteDetalle = (art: ArticuloManufacturadoDetalle) => {
    console.log("Oprimí eliminar")
    var auxArray = detalles.slice();  //hago una copia del estado detalles
    console.log("Arreglo Inicial");
    console.log(auxArray);
    //busco el detalle en el array
    var f: number = 0;
    var found = auxArray.some(function(element, index) { f = index; return element.articuloInsumo.id == art.articuloInsumo.id; });
    
    if(found){
      var eliminados = auxArray.splice(f, 1);
      console.log("Arreglo despues de eliminar");
      console.log(auxArray);
      console.log("Eliminados");
      console.log(eliminados);
      setDetalles(auxArray);
      console.log("Arreglo final");
      console.log(detalles);
      producto.articuloManufacturadoDetalles = auxArray;
      //deleteIngrediente(art);
>>>>>>> Stashed changes
  }

  //manejar el cambio en el input de cantidad
  const handleChangeAmount = (e: any, art: ArticuloManufacturadoDetalle) => {
    var amount = e.target.value;  //obtengo el valor ingresado
    var auxArray = detalles.slice();  //hago una copia del estado detalles
    //busco en la copia si el detalle ya existe, debería existir
    var f: number = 0;
    var found = auxArray.some(function(element, index) { f = index; return element === art; });
    
    if(found){
      //si lo encuentro, lo elimino con la nueva cantidad
      auxArray.splice(f, 1);
      art.cantidad = amount;
      auxArray.push(art) ;

      //vuelvo a setear el estado detalles
      setDetalles(auxArray);
      deleteIngrediente(art);
    }
  };

  const deleteIngrediente = (a: ArticuloManufacturadoDetalle) => {
    var auxArray = ingredientes.slice();  //hago una copia del estado ingredientes
    //busco al ingrediente
    var f: number = 0;
    var found = auxArray.some(function(element, index) { f = index; return element === a.articuloInsumo; });
    
    if(found){
      //si lo encuentro, lo elimino
      auxArray.splice(f, 1);

      console.log(auxArray);
      //vuelvo a setear el estado detalles
      setIngredientes(auxArray);
      console.log(ingredientes);
    }
  };

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

            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={2}>
                Ingredientes
              </Form.Label>
              <Col sm={3}>
                <Button type="button" className="btnAdd" onClick={() => {setOpenModal(true)}} >Agregar</Button>
              </Col>
            </Form.Group>

            <Container>
              {detalles?.map((art: ArticuloManufacturadoDetalle, index: number) =>
                <Row key={index} className="mb-3">
                  <Col>
                    {art.articuloInsumo.denominacion}
                  </Col>
                  <Col>
                     <Form.Control type="number" onChange={(e) => {handleChangeAmount(e, art)}}></Form.Control>
                  </Col>
                  <Col>
                    {art.cantidad} {art.articuloInsumo.unidadMedida.denominacion}
                  </Col>
                  <Col>
                    <Button  className="btn btn-danger" onClick={(e) => deleteDetalle(art)}>Eliminar</Button>
                  </Col>
                  <span></span>
                </Row>
                
              )}
            </Container>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={save} type="button">CONFIRMAR</Button>
              </Col>
            </Form.Group>
          </Form>
        </Box>
        <GenericModalSearch 
          open={openModal} 
<<<<<<< Updated upstream
          handleClose={async () => {setOpenModal(false)}} options={insumos} 
          setSelectedData={setIngredientes} list={ingredientes} 
          titulo={"Ingredientes"}></GenericModalSearch>
      </Container>
    </Box>
=======
          handleClose={async () => {setOpenModal(false)}} 
          options={insumos} 
          setSelectedData={setIngredientes} 
          list={ingredientes} 
          titulo={"Ingredientes"}>
        </GenericModalSearch>
    </div>
>>>>>>> Stashed changes
  )
}
}
