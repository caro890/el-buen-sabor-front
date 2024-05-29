import { Categoria } from "../types/Articulos/Categoria";
import { BackendClient, base } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = base + "categorias"; 
    
    //baseUrl: string = "http://localhost:8083/categoria"; 

}