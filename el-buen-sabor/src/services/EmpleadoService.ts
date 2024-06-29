import { Empleado, EmpleadoCreate } from "../types/Empresas/Empleado";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class EmpleadoService extends BackendClient<Empleado> {
    protected baseUrl: string = base + "empleados";

    //obtener empleados por sucursal
    async getAllBySucursalId(id: number): Promise<Empleado[]>{
        const response = await fetch(`${this.baseUrl}/empleadosPorSucursal/${id}`, {
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        });
        const data = await response.json();
        return data as Empleado[];
    }

    //get one by auth0id
    async getUserByAuth0Id(auth0Id: string): Promise<Empleado>{
      const response = await fetch(`${this.baseUrl}/getByAuth0ID/${auth0Id}`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      return data as Empleado;
    }
    
    //crear empleado para sucursal
    async create(nuevo: EmpleadoCreate) {
        let url = this.baseUrl + "/createEmpleado";
        const response = await fetch(url, {
          "method": "POST",
          "headers": {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${getToken()}`
          },
          "body": JSON.stringify(nuevo)
        });
        const data = await response.json();
        return data as Empleado;
    }

    async deleteById(id: number) {
        const response = await fetch(`${this.baseUrl}/bajaEmpleado/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          }
        });
        if(!response.ok) {
          throw new Error("Error al dar de baja a categoria");
        }
    }
}