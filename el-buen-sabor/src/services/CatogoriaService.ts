import { Categoria } from "../types/Articulos/Categoria";
import { CategoriaCreate } from "../types/Articulos/CategoriaCreate";
import { BackendClient, base } from "./BackendClient";

export class CategoriaService extends BackendClient<Categoria> {
    baseUrl: string = base + "categorias"; 
    
    //baseUrl: string = "http://localhost:8083/categoria"; 


    async postCategoriaCreate(data: CategoriaCreate): Promise<CategoriaCreate> {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as CategoriaCreate;
    }
}