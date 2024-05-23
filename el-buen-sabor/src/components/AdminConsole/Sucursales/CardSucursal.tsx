import { EmptyCard } from "../EmptyCard/EmptyCard"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import CIcon from "@coreui/icons-react"
import { IconButton } from "@mui/material"
import { cilPencil, cilTrash } from "@coreui/icons"
import { Sucursal } from "../../../types/Empresas/Sucursal"
import { FC } from "react"

interface IPropsCardSucursal {
    sucursales: Sucursal[],
    handleDelete: (id: number) => void,
    handleEdit: (sucursal: Sucursal) => void,
    handleSucursalSelection: (sucursal: Sucursal) => void,
    setShowModal: (estado: boolean) => void
}

export const CardSucursal: FC<IPropsCardSucursal> = ({sucursales, handleDelete, handleEdit, setShowModal, handleSucursalSelection}) => {
  return (
    <div className="d-flex flex-row card-container">
        <EmptyCard create={() => setShowModal(true)} item="sucursal" />
        {sucursales?.map((sucursal: Sucursal, index: number) => (
          <Card key={index} className="filled-card">
            <Card.Body as={Link} onClick={() => handleSucursalSelection(sucursal)} to={"/dashboard"} className="filled-card-body">
              <Card.Title>{sucursal.nombre}</Card.Title>
              <Card.Text>
                Domicilio: {sucursal.domicilio.calle} <br />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <IconButton aria-label="editar" style={{ backgroundColor: "var(--itemsColor)", marginRight: '2rem' }} onClick={() => handleEdit(sucursal)}>
                <CIcon icon={cilPencil} size="lg" />
              </IconButton>
              <IconButton aria-label="eliminar" style={{ backgroundColor: "var(--itemsColor)" }} onClick={() => handleDelete(sucursal.id)}>
                <CIcon icon={cilTrash} size="lg" />
              </IconButton>
            </Card.Footer>
          </Card>
        ))}
      </div>
  )
}
