import { Categoria } from "../types/Categoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = "http://localhost:4000/categorias"; 
}