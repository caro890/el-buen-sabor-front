import { Pais } from "../types/Domicilio/Pais";
import { BackendClient } from "./BackendClient";

export class PaisService extends BackendClient<Pais> {
    baseUrl: string = "http://localhost:8080/pais"; 
}