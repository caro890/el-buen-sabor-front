import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient, base } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = base + "articulosManufacturados"; 
    
    //baseUrl: string = "http://localhost:8083/articuloManufacturado"; 

}