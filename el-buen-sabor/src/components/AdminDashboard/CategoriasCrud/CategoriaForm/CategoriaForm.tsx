import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CategoriaService } from "../../../../services/CatogoriaService";
import { Categoria } from "../../../../types/Articulos/Categoria";
import { Sucursal } from "../../../../types/Empresas/Sucursal";
import { sucursalesByEmpresaLoader, sucursalesLoader } from "../../SucursalCrud/SucursalCrud";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { Typography } from "@mui/material";
import { categoriasLoader } from "../CategoriasCrud";
import { SucursalModalSearch } from "../../SucursalModalSearch/SucursalModalSearch";
import { useAppSelector } from "../../../../hooks/redux";
import { setSucursalesSelected } from "../../../../redux/slices/SucursalesReducer";
import { CategoriaCreate } from "../../../../types/Articulos/CategoriaCreate";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";


export const CategoriaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service: CategoriaService = new CategoriaService();

  const [categoria, setCategoria] = useState<Categoria>(new Categoria());
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoriaPadreSelected, setCategoriaPadreSelected] = useState<Categoria>();


  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [sucursalesSelected, setSucursalesSelected] = useState<Sucursal[]>([]);


  const [filteredData, setFilteredData] = useState<Sucursal[]>([]);


  const [esInsumo, setEsInsumo] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const empresa = useSelector((state: RootState) => state.empresaReducer.empresa);


  useEffect(() => {
    setFilteredData(sucursales);
  }, [sucursales]);

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var c = data as Categoria;

        if (c.categoriaPadre)
          setCategoriaPadreSelected(c.categoriaPadre);

        if (c.sucursales && c.sucursales.length <= 0) {
          setSucursalesSelected(sucursales);
        } else if (c.sucursales) {
          setSucursalesSelected(c.sucursales);
        }

        setEsInsumo(c.esInsumo);

        setCategoria(c);
      }).catch((error) => console.log(error));
    } else {
      setCategoria(new Categoria());
    }
  }, []);

  //sucursales
  useEffect(() => {
    const loadSucursales = async () => {
      const sucursales = await sucursalesByEmpresaLoader(empresa.id);
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

  const handleChangeDenominacion = (value: string) => {
    const results = sucursales.filter(
      option => (option.nombre?.toString().toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };

  const handleCheckButtonChange = (item: Sucursal, checked: boolean) => {
    var aux: Sucursal[] = sucursalesSelected.slice();
    var f = 0;
    var found = aux.some(function (element, index) { f = index; return element.id == item.id; });

    if (checked) {
      if (!found)
        aux.push(item);
    } else {
      if (found)
        aux.splice(f, 1);
    }
    setSucursalesSelected(aux);
  };



  const handleCategoriaPadreChange = (event: { target: { value: any; }; }) => {
    const selectedCategoriaPadreId = event.target.value;
    const selectedCategoria = categorias.find((cat) => cat.id == selectedCategoriaPadreId);
    if (selectedCategoria) {
      categoria.categoriaPadre = selectedCategoria;
    } else {
      categoria.categoriaPadre = new Categoria();
    };

    if (categoria.categoriaPadre)
      setCategoriaPadreSelected(categoria.categoriaPadre);
  }


  const handleEsInsumoChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setEsInsumo(event.target.checked);
  }


  //formulario
  const save = async () => {

    const categoriaCreate = new CategoriaCreate();

    categoriaCreate.denominacion = categoria.denominacion;

    if (categoriaPadreSelected) {
      categoriaCreate.idCategoriaPadre = categoriaPadreSelected.id;
      categoria.categoriaPadre = categoriaPadreSelected;
    }

    categoriaCreate.esInsumo = esInsumo;
    categoriaCreate.idSucursales = sucursalesSelected.map(s => s.id);

    categoria.sucursales = sucursalesSelected;


    if (categoriaCreate.denominacion.length <= 0) {
      alert("Debes completar el nombre de la categoría.")
      return;
    }


    if (categoriaCreate.idSucursales.length <= 0) {
      alert("Debes seleccionar al menos una sucursal.")
      return;
    }


    if (categoria.id == 0) {

      await service.postCategoriaCreate(categoriaCreate);

    } else {
      await service.put(categoria.id, categoria);

    }
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
            <Form.Select value={categoriaPadreSelected?.id} onChange={handleCategoriaPadreChange}>
              <option value="0">Elija una categoría padre</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Col} controlId="esInsumo">
          <Form.Check
            type="checkbox"
            label="Es Insumo"
            name="esInsumo"
            checked={esInsumo}
            onChange={handleEsInsumoChange}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={2}>
            Sucursales
          </Form.Label>

          {filteredData ?
            <Container className="search-container mb-3">
              <Form.Control
                className="search"
                aria-label="denominacion"
                placeholder="Denominación"
                onChange={(e: { target: { value: string; }; }) => { handleChangeDenominacion(e.target.value) }} />
            </Container>
            : null}
          <Container className="grid-container">
            {filteredData ? filteredData.map((option: Sucursal, index: number) => (
              <Row key={index}>
                <Col md="auto">
                  <Form.Check radioGroup="seleccionados"
                    aria-label={option.nombre}
                    name={String(option.id)}
                    onChange={(e) => handleCheckButtonChange(option, e.target.checked)}
                    checked={sucursalesSelected.some(selected => selected.id === option.id)}
                  />
                </Col>
                <Col md="6">
                  {option.nombre}
                </Col>
              </Row>
            )) :
              <Row>
                <Col>
                  {sucursales ? <p>Ninguna sucursal concuerda con la búsqueda</p> : <p>No hay sucursales para agregar</p>}
                </Col>
              </Row>
            }
          </Container>

        </Form.Group>

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

