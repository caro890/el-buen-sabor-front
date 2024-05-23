import { Sucursal } from "../types/Empresas/Sucursal";
import { BackendClient } from "./BackendClient";

export class sucursalService extends BackendClient<Sucursal> {
    baseUrl: string = "http://localhost:4000/sucursales"; 
}