//import { useLoaderData } from "react-router"
//import { Categoria } from "../../../types/Categoria";
import { CategoriaService } from "../../../services/CatogoriaService";

export const CategoriasCrud = () => {
  //const categorias = useLoaderData() as Categoria[];

  return (
    <div>CategoriasCrud</div>
  )
}

//loader function
export const categoriasLoader = async () => {
  const service: CategoriaService = new CategoriaService();
  return service.getAll();
}
