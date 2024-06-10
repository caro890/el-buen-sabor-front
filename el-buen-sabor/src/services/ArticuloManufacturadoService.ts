import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient, base } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = base + "articulosManufacturados"; 
    
    async changeHabilitadoState(id: number) {
        let url = this.baseUrl + `/changeHabilitado/${id}`;
        let method:string = "PUT";
        const response = await fetch(url, {
          "method": method,
          "headers": {
            "Content-Type": 'application/json'
          }
        });
        if (!response.ok) {
            throw new Error(`Error al cambiar el estado del elemento con ID ${id}`);
        }
    }
}