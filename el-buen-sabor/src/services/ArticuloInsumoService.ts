import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { BackendClient } from "./BackendClient";

export class ArticuloInsumoService extends BackendClient<ArticuloInsumo> {
    baseUrl: string = "http://localhost:8080/articulos/insumos"; 

}