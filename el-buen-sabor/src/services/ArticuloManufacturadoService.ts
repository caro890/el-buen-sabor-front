import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { BackendClient } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = "http://localhost:4000/articulosManufacturados"; 
}