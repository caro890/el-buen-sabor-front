import { ArticuloInsumo, ArticuloInsumoCreate } from "../types/Articulos/ArticuloInsumo";
import { BackendClient, base } from "./BackendClient";

export class ArticuloInsumoService extends BackendClient<ArticuloInsumo> {
  baseUrl: string = base + "articulosInsumos"; 
  
  //obtener todos para elaborar
  async getAllParaElaborar() {
    let url = this.baseUrl + "/buscar/elaborados";
    let method:string = "GET";
    const response = await fetch(url, {
      "method": method,
      "headers": {
      "Content-Type": 'application/json'
      }
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data as ArticuloInsumo[];
  }

  //obtener todos por sucursal
  async getAllBySucursalId(id: number): Promise<ArticuloInsumo[]>{
    const response = await fetch(`${this.baseUrl}/getInsumosPorSucursal/${id}`);
    const data = await response.json();
    return data as ArticuloInsumo[];
  }

  //crear nuevo con stock para todas sucursales
  async create(nuevo: ArticuloInsumoCreate) {
    let url = this.baseUrl + "/create";
    const response = await fetch(url, {
      "method": "POST",
      "headers": {
      "Content-Type": 'application/json'
      },
      "body": JSON.stringify(nuevo)
    });
    const data = await response.json();
    return data as ArticuloInsumo;
  }
}