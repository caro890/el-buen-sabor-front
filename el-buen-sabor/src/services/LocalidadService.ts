import { Localidad } from "../types/Domicilio/Localidad";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class LocalidadService extends BackendClient<Localidad> {
    baseUrl: string = base + "localidades"; 
    
    async findByProvinciaId(idProvincia: number): Promise<Localidad[]>{
        const response = await fetch(`${this.baseUrl}/findByProvincia/${idProvincia}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as Localidad[];
    }
}