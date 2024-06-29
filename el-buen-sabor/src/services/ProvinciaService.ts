import { Provincia } from "../types/Domicilio/Provincia";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class ProvinciaService extends BackendClient<Provincia> {
    baseUrl: string = base + "provincias"; 
     
    async findByPaisId(idPais: number): Promise<Provincia[]>{
        const response = await fetch(`${this.baseUrl}/findByPais/${idPais}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            }
        });
        const data = await response.json();
        return data as Provincia[];
    }
}