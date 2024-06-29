import { Sucursal } from "../types/Empresas/Sucursal";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class SucursalService extends BackendClient<Sucursal> {
    baseUrl: string = base + "sucursales";

    async findByEmpresaId(idEmpresa: number): Promise<Sucursal[]>{
        const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            }
        });
        const data = await response.json();
        return data as Sucursal[];
    }
}