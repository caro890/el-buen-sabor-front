import { Pais } from "../types/Domicilio/Pais";
import { BackendClient, base } from "./BackendClient";

export class PaisService extends BackendClient<Pais> {
    baseUrl: string = base + "pais"; 
    
//    baseUrl: string = "http://localhost:8083/pais"; 

}