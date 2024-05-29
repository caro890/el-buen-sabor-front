import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CategoriaService } from "../../../../services/CatogoriaService";
import { Categoria } from "../../../../types/Articulos/Categoria";
import { Sucursal } from "../../../../types/Empresas/Sucursal";
import { sucursalesLoader } from "../../SucursalCrud/SucursalCrud";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { Typography } from "@mui/material";
import { categoriasLoader } from "../CategoriasCrud";
import { SucursalModalSearch } from "../../SucursalModalSearch/SucursalModalSearch";
import { useAppSelector } from "../../../../hooks/redux";
import { setSucursalesSelected } from "../../../../redux/slices/SucursalesReducer";


export const CategoriaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service: CategoriaService = new CategoriaService();

  const [categoria, setCategoria] = useState<Categoria>(new Categoria());
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoriaPadreSelected, setCategoriaPadreSelected] = useState('');


  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const sucursalesSelected = useAppSelector((state) => (state.sucursalesReducer.sucursalesSelected));


  const [openModal, setOpenModal] = useState<boolean>(false);



  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var c = data as Categoria;

        if (c.categoriaPadre)
          setCategoriaPadreSelected(c.categoriaPadre.id.toString());

        if (c.sucursales)
          setSucursalesSelected(c.sucursales);


        setCategoria(c);
      }).catch((error) => console.log(error));
    } else {
      setCategoria(new Categoria());
    }
  }, []);

  //sucursales
  useEffect(() => {
    const loadSucursales = async () => {
      const sucursales = await sucursalesLoader();
      setSucursales(sucursales);
    };
    loadSucursales();


  }, []);

  //categorias
  useEffect(() => {
    const loadCategorias = async () => {
      const categorias = await categoriasLoader();
      setCategorias(categorias);
    };
    loadCategorias();
  }, []);


  const handleSucursalChange = (event: {
    target: {
      options: any; value: any;
    };
  }) => {
    const options = event.target.options;
    const values: Sucursal[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSucursalesSelected(values);
  }


  const handleCategoriaPadreChange = (event: { target: { value: any; }; }) => {
    const selectedCategoriaPadreId = event.target.value;
    const selectedCategoria = categorias.find((cat) => cat.id == selectedCategoriaPadreId);
    if (selectedCategoria && selectedCategoria.denominacion) {
      categoria.categoriaPadre = selectedCategoria;
    } else {
      categoria.categoriaPadre = new Categoria();
    };
    setCategoriaPadreSelected(categoria.categoriaPadre.id.toString());
  }

  const deleteSucursal = (s: Sucursal) => {


  };

  //formulario
  const save = async () => {



    await service.post(categoria);
    navigate('/dashboard/categorias');

  }

  return (
    <div className="w-100">
      <div className="header-box mb-3">
        <Typography variant="h5" gutterBottom>
          {`${id ? "Editar" : "Crear"} una categoría`}
        </Typography>
        <Button type="button" onClick={() => { navigate("..") }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}><CIcon icon={cilArrowLeft} size="lg"></CIcon> VOLVER</Button>
      </div>

      <Form className="w-100" >

        <Form.Group as={Row} className="mb-3" controlId="denominacion">
          <Form.Label column sm={2}>
            Nombre
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="Denominación" defaultValue={categoria?.denominacion} onChange={e => categoria.denominacion = String(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" selectid="categoriaPadre">
          <Form.Label column sm={2}>
            Categoría Padre
          </Form.Label>
          <Col sm={10}>
            <Form.Select value={categoriaPadreSelected} onChange={handleCategoriaPadreChange}>
              <option value="0">Elija una categoría padre</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={2}>
            Sucursales
          </Form.Label>
          <Col sm={3}>
            <Button type="button" className="btnAdd" onClick={() => { setOpenModal(true) }} >Agregar</Button>
          </Col>
        </Form.Group>

        <Container>
          {sucursalesSelected?.map((suc: Sucursal, index: number) =>
            <Row key={index} className="mb-3">
              <Col>
                {suc.nombre}
              </Col>
              <Col>
                <Button className="btn btn-danger mb-3" onClick={() => { deleteSucursal(suc) }}>Eliminar</Button>
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

      <SucursalModalSearch
        open={openModal}
        handleClose={async () => { setOpenModal(false) }}
        options={sucursales}>
      </SucursalModalSearch>
    </div>
  )
}

