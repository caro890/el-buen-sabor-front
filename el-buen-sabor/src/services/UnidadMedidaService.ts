import { UnidadMedida } from "../types/UnidadMedida";
import { BackendClient } from "./BackendClient";

export class UnidadMedidaService extends BackendClient<UnidadMedida> {
    baseUrl: string = "http://localhost:8083/unidadesmedida"; 
}