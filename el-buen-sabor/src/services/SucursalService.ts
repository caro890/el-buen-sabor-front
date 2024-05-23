import { Sucursal } from "../types/Empresas/Sucursal";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<Sucursal> {
    baseUrl: string = process.env.BASE_URL + "sucursal";
    //baseUrl: string = "http://localhost:8083/sucursal";

    async findByEmpresaId(idEmpresa: number): Promise<Sucursal[]>{
        const response = await fetch(`${this.baseUrl}/findByEmpresa/${idEmpresa}`);
        const data = await response.json();
        return data as Sucursal[];
    }
}