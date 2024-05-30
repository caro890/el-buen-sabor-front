import { Button, Col, Modal, Row, Form, Container } from "react-bootstrap"
import { FC, useEffect, useState } from "react";
import "../../../../styles/ProductModalSearch.module.css"
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo";
import { useAppDispatch/*, useAppSelector */} from "../../../../hooks/redux";
import { setIngredientes } from "../../../../redux/slices/IngredientesReducer";

//valores que recibe el componente
interface IPropsProductModalSearch {
    open: boolean;  //valor que indica la apertura o cierre de la ventana modal
    handleClose: () => {}; //funcion para manejar el cierre de la ventana modal
    options: ArticuloInsumo[]; //arreglo que contiene las opciones para agregar a los insumos que se mostraran en la grilla
}

export const ProductModalSearch : FC<IPropsProductModalSearch> = ({open, handleClose, options}) => {
  const [filteredData, setFilteredData] = useState<ArticuloInsumo[]>([]);  //estado para filtrar las opciones
  const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]); //estado para manejar los insumos seleccionados

  const dispatch = useAppDispatch();
  //const ingredientes = useAppSelector((state) => (state.ingredientesReducer.ingredientes));

  //cuando cargo el componente, inicia la data a mostrar con las options que recibe por parametro
  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  //funcion para cuando se marca o desmarca el checkbox de una opcion
  //recibo por parametro la opcion del checkbox que cambió y su propiedad checked
  const handleCheckButtonChange = (item: ArticuloInsumo, checked: boolean) => {
    var aux: ArticuloInsumo[] = insumos.slice();   //copio el estado de insumo
    //busco el item en el array auxiliar
    var f = 0;
    var found = aux.some(function(element, index) { f = index; return element.id == item.id; });

    if(checked) { //si está marcado el checkbox,
        if(!found) //y no se encuentra el item en el array (para evitar repetidos)
            aux.push(item); //lo añado array auxiliar
    } else {  //si no está marcado el checkbox
        if (found) //y encuentro el item en el array
           aux.splice(f, 1);    //lo elimino del array auxiliar
    }
    setInsumos(aux);
  };

  const handleAdd = () => {
    dispatch(setIngredientes(insumos));    //seteo el estado detalle con el array auxiliar
    setInsumos([]);
    handleClose();
  };

  //función para realizar la búsqueda de opciones por código
  const handleChangeCodigo = (value: string) => {
    //filtramos las opciones segun el valor ingresado
    const results = options.filter(
        option => (option.codigo.toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };

  //función para realizar la búsqueda de opciones por denominacion
  const handleChangeDenominacion = (value: string) => {
    //filtramos las opciones segun el valor ingresado
    const results = options.filter(
        option => (option.denominacion.toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };
    
  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header>
          <Modal.Title>Agregar ingredientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {filteredData? //al abrir el modal solo muestro los filtros si tengo datos
            <Container className="search-container mb-3">
                {/*Input para las búsquedas por código y denominación */}
                <Form.Control 
                    className="search" 
                    aria-label="codigo" 
                    placeholder="Código" 
                    onChange={(e) => {handleChangeCodigo(e.target.value)}} /> 
                <Form.Control 
                    className="search"
                    aria-label="denominacion" 
                    placeholder="Denominación" 
                    onChange={(e) => {handleChangeDenominacion(e.target.value)}}/>
            </Container>
            : null}
            <Container className="grid-container">  {/*Creo una grilla para mapear las opciones dentro */}
                {/* Mapeo las opciones mostrando un check button, el codigo y la denominacion */}
                {filteredData? filteredData.map((option: ArticuloInsumo, index:number) => (
                    <Row key={index}>
                        <Col md="auto">
                            <Form.Check radioGroup="seleccionados" aria-label={option.denominacion} name={String(option.id)} onChange={(e) => handleCheckButtonChange(option, e.target.checked)}/>
                        </Col>
                        <Col md="6">
                            {option.codigo}
                        </Col>
                        <Col>
                            {option.denominacion}
                        </Col>
                    </Row>
                )):
                <Row>
                    {/*Si no hay opciones muestro un mensaje */}
                    <Col>
                        {options? <p>Ningún ingrediente concuerda con la búsqueda</p> : <p>No hay ingredientes para agregar</p>}
                    </Col>
                </Row>
                }
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnClose" type="button" onClick={handleClose}>CERRAR</Button> {/*Boton para cerrar la ventana */}
          <Button className="btnAdd" type="button" onClick={handleAdd}>AGREGAR</Button> {/*Boton para agregar los detalles elegidos*/}
        </Modal.Footer>
      </Modal>
  )
}
