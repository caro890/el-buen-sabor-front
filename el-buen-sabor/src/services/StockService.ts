import { Stock, StockShort } from "../types/Articulos/Stock";
import { base } from "./BackendClient";
import { getToken } from "./TokenService";

export class StockService {
    protected baseUrl: string = base + "stocks";

    //actualizar stock
    async put(id: number, data: Stock): Promise<Stock> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          },
          body: JSON.stringify(data),
        });
        const newData = await response.json();
        return newData as Stock;
    }

    //obtener stock por sucursal
    async getAllBySucursalId(id: number): Promise<StockShort[]>{
        const response = await fetch(`${this.baseUrl}/getBySucursalId/${id}`, {
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        const data = await response.json();
        return data as StockShort[];
    }

    //obtener stock por id
    async getById(id: number): Promise<StockShort | undefined> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        if (!response.ok) {
          return undefined;
        }
        const data = await response.json();
        return data as StockShort;
    }
}