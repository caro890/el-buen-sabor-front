import { useParams } from "react-router"

export const InsumosForm = () => {
    const { id } = useParams();

  return (
    <div>InsumosForm {id}</div>
  )
}
