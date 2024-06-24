import { Empleado, EmpleadoCreate } from "../types/Empresas/Empleado";
import { BackendClient, base } from "./BackendClient";

export class EmpleadoService extends BackendClient<Empleado> {
    protected baseUrl: string = base + "empleados";

    //obtener empleados por sucursal
    async getAllBySucursalId(id: number): Promise<Empleado[]>{
        const response = await fetch(`${this.baseUrl}/empleadosPorSucursal/${id}`);
        const data = await response.json();
        return data as Empleado[];
    }

    //crear empleado para sucursal
    async create(nuevo: EmpleadoCreate) {
        let url = this.baseUrl + "/createEmpleado";
        const response = await fetch(url, {
          "method": "POST",
          "headers": {
          "Content-Type": 'application/json'
          },
          "body": JSON.stringify(nuevo)
        });
        const data = await response.json();
        return data as Empleado;
    }
}