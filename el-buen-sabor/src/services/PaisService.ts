import { Pais } from "../types/Domicilio/Pais";
import { BackendClient } from "./BackendClient";

export class PaisService extends BackendClient<Pais> {
    baseUrl: string = process.env.BASE_URL + "pais"; 
    
//    baseUrl: string = "http://localhost:8083/pais"; 

}