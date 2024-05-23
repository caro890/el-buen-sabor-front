import { Categoria } from "../types/Articulos/Categoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = "http://localhost:8080/categorias"; 
}