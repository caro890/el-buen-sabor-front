import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = process.env.BASE_URL + "articuloManufacturado"; 
    
    //baseUrl: string = "http://localhost:8083/articuloManufacturado"; 

}