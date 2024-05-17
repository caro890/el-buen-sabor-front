import { Button, Col, Modal, Row, Form, Container, InputGroup } from "react-bootstrap"
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Box, } from "@mui/material";
import Swal from "sweetalert2";
import "../../../styles/GenericModalSearch.css"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { ArticuloManufacturadoDetalle } from "../../../types/ArticuloManufacturadoDetalle";
import { setElementActive } from "../../../redux/slices/ProductosReducer";
import { Base } from "../../../types/Base";

//valores que recibe el componente
interface IPropsGenericModalSearch {
    open: boolean;  //valor que indica la apertura o cierre de la ventana modal
    handleClose: () => {}; //funcion para manejar el cierre de la ventana modal
    options: any[]; //arreglo que contiene las opciones para agregar a los detalles que se mostraran en la grilla
    setSelectedData: (array: any[]) => void;
}

export const GenericModalSearch : FC<IPropsGenericModalSearch> = ({open, handleClose, options, setSelectedData}) => {
  const [detalle, setDetalles] = useState<any[]>([]); //estado para almacenar los detalles
  const [maestro, setMaestro] = useState<any>(); //estado para almacenar el maestro de detalles
  
  const dispatch = useAppDispatch(); //importo el hook para cambiar el estado global

  const elemento = useAppSelector((state) => (state.tableDataReducer.elementActive)); //obtener el elemento activo del estado global

  useEffect(() => {
    if(elemento) { //si existe un elemento en el estado global
        setMaestro(elemento); //seteo el estado local con el valor del elemento seleccionado globalmente
    } else { //sino
        //setMaestro();    //creo un nuevo elemento
    }
  }, [elemento]); 

  //funcion para cuando se marca o desmarca el checkbox de una opcion
  //recibo por parametro la opcion del checkbox que cambió y su propiedad checked
  const handleCheckButtonChange = (item: any, checked: boolean) => {
    if(checked) { //si está marcado
        detalle.push(item); //añado la opcion al detalle
    } else { //sino busco la opción en el detalle, si la encuentro la borro
        var f = 0;
        var found = detalle.some(function(element, index) { f = index; return element.id == item.id; });

        if (found) {
           detalle.splice(f, 1);
        }
    }
  };

  //función para agregar los detalles al maestro
  const handleAdd = () => {
    /*if(maestro.articuloManufacturadoDetalles){  //si tiene detalles de articulo manufacturado estoy trabajando con un producto
        console.log(maestro);
        //creo un nuevo producto
        var articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado(); 
        //copio maestro en el nuevo producto para poder modificarlo sin afectar el estado global
        var r = Object.assign(articuloManufacturado, maestro);
        //copio el arreglo del estado global
        var array = maestro.articuloManufacturadoDetalles.slice();
        detalle?.forEach((item: ArticuloInsumo, index: number) => {  // recorro los articulos insumos guardados y los agrego al array nuevo
            var aux: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle; //creo un nuevo detalle
            aux.articuloInsumo = item; //le asigno el insumo
            array.push(item); //agrego el detalle al arreglo que copie
            r.articuloManufacturadoDetalles = array; //seteo el arreglo de detalles del objeto copiado
            setMaestro(r); //seteo el estado con el nuevo objeto con las modificaciones
            console.log(r);
        });
    }*/

    //dispatch(setElementActive({element: maestro})); //seteo a maestro como el elemento activo

    setSelectedData(detalle);

    //Muestro un mensaje de éxito
    Swal.fire({
        title: "Realizado",
        text: "Los ingredientes han sido agregados",
        icon: "success",
    })
  };
    
  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header>
          <Modal.Title>Agregar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container className="search-container mb-3">
                <Form.Control className="search" aria-label="codigo" placeholder="Código" />
                <Form.Control className="search" aria-label="denominacion" placeholder="Denominación"/>
            </Container>
            <Container className="grid-container">  {/*Creo una grilla para mapear las opciones dentro */}
                {/* Mapeo las opciones mostrando un check button, el codigo y la denominacion */}
                {options? options.map((option:any, index:number) => (
                    <Row key={index}>
                        <Col md="auto">
                            <Form.Check radioGroup="seleccionados" aria-label={option.denominacion} name={option.id} onChange={(e) => handleCheckButtonChange(option, e.target.checked)}/>
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
                    <Col>No hay elementos guardados</Col>
                </Row>
                }
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={handleClose}>CERRAR</Button>
          <Button type="button" onClick={handleAdd}>AGREGAR</Button>
        </Modal.Footer>
      </Modal>
  )
}
