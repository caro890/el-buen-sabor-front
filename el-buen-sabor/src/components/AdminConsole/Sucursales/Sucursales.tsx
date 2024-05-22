import { useParams } from "react-router"

export const Sucursales = () => {
  const { id } = useParams();

  return (
    <div>Sucursales de empresa {id}</div>
  )
}
