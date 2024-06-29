import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = base + "articulosManufacturados"; 
    
    async changeHabilitadoState(id: number) {
        let url = this.baseUrl + `/changeHabilitado/${id}`;
        let method:string = "PUT";
        const response = await fetch(url, {
          "method": method,
          "headers": {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${getToken()}`
          }
        });
        if (!response.ok) {
            throw new Error(`Error al cambiar el estado del elemento con ID ${id}`);
        }
    }
    
  //obtener todos por sucursal
  async getAllBySucursalId(id: number): Promise<ArticuloManufacturado[]>{
    const response = await fetch(`${this.baseUrl}/getManufacturadosPorSucursal/${id}`,{
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await response.json();
    return data as ArticuloManufacturado[];
  }

  //crear nuevo con stock para todas sucursales
  async create(nuevo: ArticuloManufacturado) {
    let url = this.baseUrl + "/create";
    const response = await fetch(url, {
      "method": "POST",
      "headers": {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${getToken()}`
      },
      "body": JSON.stringify(nuevo)
    });
    const data = await response.json();
    return data as ArticuloManufacturado;
  }
}