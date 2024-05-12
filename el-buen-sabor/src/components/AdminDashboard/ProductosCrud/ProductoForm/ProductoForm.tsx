import { useParams } from "react-router"

export const ProductoForm = () => {
    const { id } = useParams();

  return (
    <div>ProductoForm {id}</div>
  )
}

