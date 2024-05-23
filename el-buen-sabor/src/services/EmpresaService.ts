import { Empresa } from "../types/Empresas/Empresa";
import { BackendClient } from "./BackendClient";

export class EmpresaService extends BackendClient<Empresa> {
    baseUrl: string = "http://localhost:8080/empresa"; 
}