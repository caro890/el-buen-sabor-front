import { Sucursal } from "../types/Empresas/Sucursal";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<Sucursal> {
    baseUrl: string = "http://localhost:8080/sucursal"; 
}