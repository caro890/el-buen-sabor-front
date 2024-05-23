import { Domicilio } from "../types/Domicilio/Domicilio";
import { BackendClient, base } from "./BackendClient";

export class DomicilioService extends BackendClient<Domicilio> {
    baseUrl: string = base +"domicilio"; 
    
    //baseUrl: string = "http://localhost:8083/domicilio"; 

}