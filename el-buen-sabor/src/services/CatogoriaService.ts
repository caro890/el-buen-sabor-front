import { Categoria } from "../types/Articulos/Categoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = "https://buensavorjoined-1.onrender.com/categoria"; 
    
    //baseUrl: string = "http://localhost:8083/categoria"; 

}