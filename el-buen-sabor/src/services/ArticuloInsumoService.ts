import { ArticuloInsumo } from "../types/Articulos/ArticuloInsumo";
import { BackendClient, base } from "./BackendClient";

export class ArticuloInsumoService extends BackendClient<ArticuloInsumo> {
    baseUrl: string = base + "articuloInsumo"; 

    async getInsumosParaElaborar() {
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
}