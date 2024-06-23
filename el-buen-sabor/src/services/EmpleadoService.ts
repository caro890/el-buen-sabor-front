import { Empleado } from "../types/Empresas/Empleado";
import { BackendClient, base } from "./BackendClient";

export class EmpleadoService extends BackendClient<Empleado> {
    protected baseUrl: string = base + "/empleados";

    //obtener empleados por sucursal
    async getAllBySucursalId(id: number): Promise<Empleado[]>{
        const response = await fetch(`${this.baseUrl}/empleadosPorSucursal/${id}`);
        const data = await response.json();
        return data as Empleado[];
    }
}