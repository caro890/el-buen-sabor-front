import { Empresa } from "../types/Empresas/Empresa";
import { BackendClient } from "./BackendClient";

export class EmpresaService extends BackendClient<Empresa> {
    baseUrl: string = process.env.BASE_URL + "empresa"; 
    
    //baseUrl: string = "http://localhost:8083/empresa"; 

    async getFull(id: number): Promise<Empresa[]>{
        const response = await fetch(`${this.baseUrl}/full/${id}`);
        const data = await response.json();
        return data as Empresa[];
    }
}