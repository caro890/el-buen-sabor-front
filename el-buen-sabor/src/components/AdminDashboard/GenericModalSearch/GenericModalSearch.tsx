import { Button, Col, Modal, Row, Form, Container } from "react-bootstrap"
import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../styles/GenericModalSearch.css"

//valores que recibe el componente
interface IPropsGenericModalSearch {
    open: boolean;  //valor que indica la apertura o cierre de la ventana modal
    handleClose: () => {}; //funcion para manejar el cierre de la ventana modal
    options: any[]; //arreglo que contiene las opciones para agregar a los detalles que se mostraran en la grilla
    setSelectedData: (array: any[]) => void;    //funcion para actualizar el estado en el componente padre
    list: any[]    //arreglo con los detalles existentes
    titulo: string; //titulo de la ventana se concatena a Agregar + titulo
}

export const GenericModalSearch : FC<IPropsGenericModalSearch> = ({open, handleClose, options, setSelectedData, list, titulo}) => {
  const [detalle, setDetalle] = useState<any[]>([]); //estado para almacenar los detalles
  const [filteredData, setFilteredData] = useState<any[]>([]);  //estado para filtrar las opciones

  //cuando cargo el componente, inicia la data a mostrar con las options que recibe por parametro
  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  //cuando cargo el componente, inicio los detalles con los existentes que recibi por parametro
  useEffect(() => {
    setDetalle(list);
  }, []);

  //funcion para cuando se marca o desmarca el checkbox de una opcion
  //recibo por parametro la opcion del checkbox que cambió y su propiedad checked
  const handleCheckButtonChange = (item: any, checked: boolean) => {
    var aux: any[] = detalle.slice();   //copio el estado de detalle
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
    setDetalle(aux);    //seteo el estado detalle con el array auxiliar
  };

  //función para agregar los detalles al maestro
  const handleAdd = () => {
    if(detalle === list) {   //si el array de detalles es distinto al inicial
        //le digo al usuario que no ha añadido nada nuevo
        Swal.fire({
            title: "Atención",
            text: "No ha añadido ningún elemento nuevo",
            icon: "warning",
        })
    } else { //sino
        //utilizo la funcion del componente padre para setear el estado en el mismo
        setSelectedData(detalle);

        //Muestro un mensaje de éxito si guarde opciones en detalles
        Swal.fire({
            title: "Realizado",
            icon: "success",
        })
    }
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
          <Modal.Title>Agregar {titulo}</Modal.Title>
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
                {filteredData? filteredData.map((option:any, index:number) => (
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
                    <Col>
                        {options? <p>Ningún elemento concuerda con la búsqueda</p> : <p>No hay elementos para agregar</p>}
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
