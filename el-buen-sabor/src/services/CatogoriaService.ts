import { Categoria, CategoriaCreate } from "../types/Articulos/Categoria";
import { SucursalShort } from "../types/Empresas/Sucursal";
import { BackendClient, base } from "./BackendClient";
import { getToken } from "./TokenService";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = base + "categorias"; 
    
    async postCategoriaCreate(data: CategoriaCreate): Promise<CategoriaCreate> {
      const response = await fetch(`${this.baseUrl + "/create"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as CategoriaCreate;
    }

    async deleteById(id: number, sucursal: SucursalShort) {
      const response = await fetch(`${this.baseUrl}/baja/${id}/${sucursal.id}`, {
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

  async getAllBySucursalId(id: number): Promise<Categoria[]> {
    const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${id}`,{
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await response.json();
    return data as Categoria[];
  }    

  async getAllInsumoBySucursalId(id: number): Promise<Categoria[]> {
    const response = await fetch(`${this.baseUrl}/categoriasInsumoPorSucursal/${id}`,{
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await response.json();
    return data as Categoria[];
  }    

  async getAllManufacturadoSucursalById(id: number): Promise<Categoria[]> {
    const response = await fetch(`${this.baseUrl}/categoriasManufacturadoPorSucursal/${id}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await response.json();
    return data as Categoria[];
  }
}