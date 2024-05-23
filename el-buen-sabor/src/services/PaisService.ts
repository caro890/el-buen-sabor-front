import { Pais } from "../types/Domicilio/Pais";
import { BackendClient } from "./BackendClient";

export class PaisService extends BackendClient<Pais> {
    baseUrl: string = "https://buensavorjoined-1.onrender.com/pais"; 
    
//    baseUrl: string = "http://localhost:8083/pais"; 

}