import { Domicilio } from "../types/Domicilio/Domicilio";
import { BackendClient } from "./BackendClient";

export class DomicilioService extends BackendClient<Domicilio> {
    baseUrl: string = "http://localhost:8080/domicilio"; 
}