import { useParams } from "react-router"
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../../../types/Articulos/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import { useNavigate } from "react-router";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { categoriasLoader } from "../../CategoriasCrud/CategoriasCrud";
import { Categoria } from "../../../../types/Articulos/Categoria";
import { unidadesMedidaLoader } from "../../UnidadesMedidaCrud/UnidadesMedidaCrud";
import { UnidadMedida } from "../../../../types/Articulos/UnidadMedida";
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo";
import { ArticuloManufacturadoDetalle } from "../../../../types/Articulos/ArticuloManufacturadoDetalle";
import { ProductModalSearch } from "../../ProductModalSearch/ProductModalSearch";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";
import "../../../../styles/ProductForm.module.css"
import { setIngredientes } from "../../../../redux/slices/IngredientesReducer";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

export const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  const serviceInsumo: ArticuloInsumoService = new ArticuloInsumoService();

  const [producto, setProducto] = useState<ArticuloManufacturado>(new ArticuloManufacturado());
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);

  //Estado  para controlar la ventana modals
  const [openModal, setOpenModal] = useState<boolean>(false);  
  const [unidadMedidaSelected, setUnidadMedidaSelected] = useState('');

  const [categoriaSelected, setCategoriaSelected] = useState('');
  const [precioVentaSelected, setPrecioVentaSelected] = useState(0);
  const [tiempoEstimadoSelected, setTiempoEstimadoSelected] = useState(0);
  const [codigoSelected, setCodigoSelected] = useState('');

  const ingredientes = useAppSelector((state) => (state.ingredientesReducer.ingredientes));
  const [details, setDetails] = useState<ArticuloManufacturadoDetalle[]>([]);

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var p = data as ArticuloManufacturado;
        setProducto(p);
        setUnidadMedidaSelected(p.unidadMedida.id.toString());
        setCategoriaSelected(p.categoria.id.toString());
        setPrecioVentaSelected(p.precioVenta);
        setTiempoEstimadoSelected(p.tiempoEstimadoMinutos);
        setCodigoSelected(p.codigo.replace(/\D/g, ""));
        setDetails(p.articuloManufacturadoDetalles);
      }).catch((error) => console.log(error));
    } else {
      setProducto(new ArticuloManufacturado());
    }
  }, []);

  //cargar los ingredientes en el estado global
  useEffect(() => {
    var arrayI: ArticuloInsumo[] = [];

    producto.articuloManufacturadoDetalles.forEach((item) => {
      arrayI.push(item.articuloInsumo);
    });

    dispatch(setIngredientes(arrayI));
  },[]);

  //cargar los insumos como detalles
  useEffect(() => {
      var array: ArticuloManufacturadoDetalle[] = details.slice();
      ingredientes.forEach((item) => {
        var found = array.some(function(element) { 
          return element.articuloInsumo.id === item.id; 
        });

        if(!found){
          var detalle: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
          detalle.articuloInsumo = item;
          array.push(detalle);
        }
      });
      
    /*ingredientes.forEach((item, index)=>{
      var detalle: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
      detalle.articuloInsumo = item;
      array.push(detalle);
    });*/
    setDetails(array);
  }, [ingredientes]);

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

  const handleCategoriaChange = (event: { target: { value: any; }; }) => {
    const selectedCategoriaId = event.target.value;
    const selectedCategoria = categorias.find((cat) => cat.id == selectedCategoriaId);
    if (selectedCategoria && selectedCategoria.denominacion) {
      producto.categoria = selectedCategoria;
    } else {
      producto.categoria = new Categoria();
    };
    setCategoriaSelected(producto.categoria.id.toString());
  }

  const handleUnidadMedidaChange = (event: { target: { value: any; }; }) => {
    const selectedUnidadMedidaId = event.target.value;
    const selectedUnidadMedida = unidadesMedida.find((um) => um.id == selectedUnidadMedidaId);
    if (selectedUnidadMedida && selectedUnidadMedida.denominacion) {
      producto.unidadMedida = selectedUnidadMedida;
    } else {
      producto.unidadMedida = new UnidadMedida();
    };
    setUnidadMedidaSelected(producto.unidadMedida.id.toString());
  }

  const handlePrecioVentaChange = (event: { target: { value: any; }; }) => {
    producto.precioVenta = event.target.value;
    setPrecioVentaSelected(event.target.value);
  }

  const handleTiempoEstimadoChange = (event: { target: { value: any; }; }) => {
    producto.tiempoEstimadoMinutos = event.target.value;
    setTiempoEstimadoSelected(event.target.value);
  }

  const handleCodigoChange = (event: { target: { value: any; }; }) => {
    producto.codigo = event.target.value.toString();
    setCodigoSelected(producto.codigo);
  }

  //formulario
  const save = async () => {
    // console.log(producto.denominacion);
    // console.log(producto.codigo);
    // console.log(producto.descripcion);
    // console.log(producto.precioVenta);
    // console.log(producto.categoria.denominacion);
    // console.log(producto.unidadMedida.denominacion);
    // console.log(producto.preparacion);
    // console.log(producto.tiempoEstimadoMinutos);
    // console.log(producto.articuloManufacturadoDetalles);
    // alert();


    


    var arrayAux: ArticuloManufacturadoDetalle[] = details.slice();
    var found = arrayAux.some(function(element) { 
      return element.cantidad === 0; 
    });

    if(found){
      alert("Los ingredientes no pueden tener cantidad cero");
      return;
    }

    //logica guardado detalles
    producto.articuloManufacturadoDetalles = details; 
    console.log(producto.articuloManufacturadoDetalles);


    if (producto.denominacion == "" || producto.codigo == "" || producto.descripcion == "" || producto.precioVenta == 0 || producto.categoria.id == 0 || producto.unidadMedida.id == 0 || producto.preparacion == "" || producto.tiempoEstimadoMinutos == 0 || producto.articuloManufacturadoDetalles.length == 0) {
      alert("Falta completar campos");
      return;
    }

    producto.codigo = "M" + producto.codigo;

    await service.post(producto);
    navigate('/dashboard/productos');

  }

  //manejar el cambio en el input de cantidad
  const handleChangeAmount = (e: any, art: ArticuloManufacturadoDetalle) => {
    try {
      var amount = e.target.value;
      if(amount > 0) {
      //busco el detalle en el arreglo
      var arrayAux: ArticuloManufacturadoDetalle[] = details.slice();
      var f: number = 0;
      var found = arrayAux.some(function(element, index) { 
        f = index; return element.articuloInsumo === art.articuloInsumo; 
      });
      //lo  obtengo del arreglo
      if(found){
        var aux: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
        var detalle = arrayAux.splice(f, 1);
        detalle.forEach(( item)=>{
          aux.createFrom(item);
        });
        aux.cantidad = amount;

        arrayAux.splice(f, 0, aux);
        setDetails(arrayAux);
      }
    }
    } catch(error) {
      console.log(error);
    }
  };

  const deleteIngrediente = (a: ArticuloManufacturadoDetalle) => {
    var arrayAux: ArticuloManufacturadoDetalle[] = details.slice();
    var f: number = 0;
    var found = arrayAux.some(function(element, index) { 
      f = index; return element.articuloInsumo === a.articuloInsumo; 
    });

    if(found){
      arrayAux.splice(f, 1);

      setDetails(arrayAux);
      //dispatch(removeIngrediente({element: a.articuloInsumo}));
    }
    
  };

  return (
    <div className="w-100">
        <div className="header-box mb-3">
          <Typography variant="h5" gutterBottom>
            {`${id ? "Editar" : "Crear"} un producto`}
          </Typography>
          <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
        </div>
        
          <Form className="w-100" >
            <Form.Group as={Row} className="mb-3" controlId="denominacion">
              <Form.Label column sm={2}>
                Denominación
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="text" placeholder="Denominación" defaultValue={producto?.denominacion} onChange={e => producto.denominacion = String(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="codigo">
              <Form.Label column sm={2}>
                Código
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="number" placeholder="Código" value={codigoSelected} onChange={handleCodigoChange} />
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
                <Form.Control type="number" placeholder="Precio de venta" value={precioVentaSelected} onChange={handlePrecioVentaChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" selectid="categoria">
              <Form.Label column sm={2}>
                Categoría
              </Form.Label>
              <Col sm={10}>

                <Form.Select value={categoriaSelected} onChange={handleCategoriaChange}>
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
                <Form.Select value={unidadMedidaSelected} onChange={handleUnidadMedidaChange}>
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
                <Form.Control type="number" placeholder="Tiempo estimado de preparación" value={tiempoEstimadoSelected} onChange={handleTiempoEstimadoChange} />
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
              {details?.map((art: ArticuloManufacturadoDetalle, index: number) =>
                <Row key={index} className="mb-3">
                  <Col>
                    {art.articuloInsumo.denominacion}
                  </Col>
                  <Col>
                     <Form.Control className="mb-3" type="number" onChange={(e) => handleChangeAmount(e, art)}></Form.Control>
                  </Col>
                  <Col>
                    {art.cantidad} {art.articuloInsumo.unidadMedida.denominacion}
                  </Col>
                  <Col>
                    <Button className="btn btn-danger mb-3" onClick={() => {deleteIngrediente(art)}}>Eliminar</Button>
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
        <ProductModalSearch 
          open={openModal} 
          handleClose={async () => {setOpenModal(false)}} 
          options={insumos}>
        </ProductModalSearch>
    </div>  
  )
}
