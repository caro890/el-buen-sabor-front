import { UnidadMedida } from "../types/Articulos/UnidadMedida";
import { BackendClient } from "./BackendClient";

export class UnidadMedidaService extends BackendClient<UnidadMedida> {
    baseUrl: string = "http://localhost:8083/unidadesmedida"; 
}