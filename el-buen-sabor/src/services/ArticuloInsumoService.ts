import { ArticuloInsumo } from "../types/Articulos/ArticuloInsumo";
import { BackendClient } from "./BackendClient";

export class ArticuloInsumoService extends BackendClient<ArticuloInsumo> {
    baseUrl: string = process.env.BASE_URL + "articuloInsumo"; 
    
    //baseUrl: string = "http://localhost:8083/articuloInsumo"; 

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