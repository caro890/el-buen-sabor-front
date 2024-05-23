import { UnidadMedida } from "../types/Articulos/UnidadMedida";
import { BackendClient } from "./BackendClient";

export class UnidadMedidaService extends BackendClient<UnidadMedida> {
    baseUrl: string = "https://buensavorjoined-1.onrender.com/unidadesmedida"; 
    //baseUrl: string = "http://localhost:8083/unidadesmedida"; 
}