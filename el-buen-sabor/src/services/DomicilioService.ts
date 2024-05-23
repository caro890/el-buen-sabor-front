import { Domicilio } from "../types/Domicilio/Domicilio";
import { BackendClient } from "./BackendClient";

export class DomicilioService extends BackendClient<Domicilio> {
    baseUrl: string = process.env.BASE_URL +"domicilio"; 
    
    //baseUrl: string = "http://localhost:8083/domicilio"; 

}