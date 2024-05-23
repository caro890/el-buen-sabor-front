import { Localidad } from "../types/Domicilio/Localidad";
import { BackendClient } from "./BackendClient";

export class LocalidadService extends BackendClient<Localidad> {
    baseUrl: string = "http://localhost:8080/localidad"; 

    async findByProvinciaId(idProvincia: number): Promise<Localidad[]>{
        const response = await fetch(`${this.baseUrl}/findByProvincia/${idProvincia}`);
        const data = await response.json();
        return data as Localidad[];
    }
}