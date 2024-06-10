import { Categoria } from "../types/Articulos/Categoria";
import { CategoriaCreate } from "../types/Articulos/CategoriaCreate";
import { BackendClient, base } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = base + "categoria"; 

    async postCategoriaCreate(data: CategoriaCreate): Promise<CategoriaCreate> {
      const response = await fetch(`${this.baseUrl + "/create"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as CategoriaCreate;
    }

  async getAllInsumo(): Promise<Categoria[]> {
    const response = await fetch(`${this.baseUrl}` + "/categoriasInsumos");
    const data = await response.json();
    return data as Categoria[];
  }    

  async getAllManufacturado(): Promise<Categoria[]> {
    const response = await fetch(`${this.baseUrl}` + "/categoriasManufacturados");
    const data = await response.json();
    return data as Categoria[];
  }
}