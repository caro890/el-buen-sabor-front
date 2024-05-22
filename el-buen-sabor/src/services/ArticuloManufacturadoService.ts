import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = "http://localhost:8083/articulos/manufacturados"; 
}