import { Provincia } from "../types/Domicilio/Provincia";
import { BackendClient } from "./BackendClient";

export class ProvinciaService extends BackendClient<Provincia> {
    baseUrl: string = "http://localhost:8080/provincia"; 

    async findByPaisId(idPais: number): Promise<Provincia[]>{
        const response = await fetch(`${this.baseUrl}/findByPais/${idPais}`);
        const data = await response.json();
        return data as Provincia[];
    }
}