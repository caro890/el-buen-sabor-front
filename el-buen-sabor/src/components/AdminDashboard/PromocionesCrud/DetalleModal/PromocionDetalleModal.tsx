import { FC } from "react"
import { Modal, Row, Col, Container } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux"
import styles from "../../../../styles/ProductoDetailModal.module.css"
import { GenericGallery } from "../../../GenericGallery/GenericGallery"
import formatPrice from "../../../../types/formats/priceFormat"
import { formatDateLong, formatHour } from "../../../../types/formats/dateFormat"
import { PromocionDetalle } from "../../../../types/Articulos/PromocionDetalle"

interface IPropsPromocionDetalleModal {
    open: boolean,
    handleClose: () => void
}

export const PromocionDetalleModal : FC<IPropsPromocionDetalleModal> = ({
    open,
    handleClose
}) => {
  const item = useAppSelector((state) => state.tableDataReducer.elementActive);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item? 
                <Modal.Title  className={styles.title}> 
                    <p className={styles.title}>{item.denominacion}</p> 
                    {item.habilitado ? 
                        <div className={styles.habilitadoBox}>
                            <p className={styles.habilitadoLabel}>HABILITADO</p>
                        </div> 
                        : 
                        <div className={styles.deshabilitadoBox}>
                            <p className={styles.deshabilitadoLabel}>DESHABILITADO</p>
                        </div>
                    }
                </Modal.Title>
            : null}
        </Modal.Header>
        <Modal.Body>
          {item?
            <Container>
                <Row className="mb-3">
                    <Col>
                        <GenericGallery imagenes={item.imagenes}></GenericGallery>
                    </Col>
                    <Col>
                        <b>Precio Promocional:</b> {formatPrice(item.precioPromocional)} <br />
                        <b>Duración</b><br/>
                            <b>Inicio:</b> {formatDateLong(item.fechaDesde)} {formatHour(item.horaDesde)} <br />
                            <b>Fin:</b> {formatDateLong(item.fechaHasta)} {formatHour(item.horaHasta)} <br />
                        <b>Tipo de Promoción:</b> {item.tipoPromocion} <br/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <b>Descripción</b>
                    {item.descripcionDescuento}
                </Row>
                <Row>
                    <Container>
                        <Row>
                            <b>Articulos</b>
                        </Row>
                        {item.promocionDetalles?.map((detalle: PromocionDetalle, index: number) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        {detalle.cantidad} {detalle.articulo.unidadMedida.denominacion} de {detalle.articulo.denominacion}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
                </Row>
            </Container>
          : null } 
        </Modal.Body>
    </Modal>
  )
}
