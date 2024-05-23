import { Domicilio } from "../types/Domicilio/Domicilio";
import { BackendClient } from "./BackendClient";

export class DomicilioService extends BackendClient<Domicilio> {
    baseUrl: string = "https://buensavorjoined-1.onrender.com/domicilio"; 
    
    //baseUrl: string = "http://localhost:8083/domicilio"; 

}