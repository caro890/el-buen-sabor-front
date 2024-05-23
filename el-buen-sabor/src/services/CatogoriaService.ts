import { Categoria } from "../types/Articulos/Categoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = process.env.BASE_URL + "categoria"; 
    
    //baseUrl: string = "http://localhost:8083/categoria"; 

}