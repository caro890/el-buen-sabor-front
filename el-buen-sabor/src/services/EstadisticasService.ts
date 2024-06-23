import { CostoGanancia, IngresosDiarios, IngresosMensuales, PedidosCliente, RankingProductos } from "../types/Estadisticas";
import { base } from "./BackendClient";

export class EstadisticasService {
  protected baseUrl: string = base + "/estadisticas";

  async getBestProductsRanking(idSucursal: number, desde: Date, hasta: Date): Promise<RankingProductos[]> {
    const response = await fetch(`${this.baseUrl}/ranking/${idSucursal}?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as RankingProductos[];
  }

  async getIngresosDiarios(desde: Date, hasta: Date): Promise<IngresosDiarios[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesDiarias?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosDiarios[];
  }

  async getIngresosMensuales(desde: Date, hasta: Date): Promise<IngresosMensuales[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesMensuales?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosMensuales[];
  }

  async getCostosGanancias(desde: Date, hasta: Date): Promise<CostoGanancia> {
    const response = await fetch(`${this.baseUrl}/costosGanancias?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as CostoGanancia;
  }

  async getPedidosCliente(desde: Date, hasta: Date): Promise<PedidosCliente[]> {
    const response = await fetch(`${this.baseUrl}/pedidosCliente?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as PedidosCliente[];
  }

  async generateExcel(idSucursal: number, desde: Date, hasta: Date) {
    const urlServer: string = `${this.baseUrl}/excel/${idSucursal}?fechaDesde=${desde}&fechaHasta=${hasta}`;
    window.open(urlServer, "_blank");
  }

  async getRankingEmpresas(idEmpresa: number,desde: Date, hasta: Date): Promise<RankingProductos[]> {
    const response = await fetch(`${this.baseUrl}/rankingEmpresa/${idEmpresa}?fechaDesde=${desde}&fechaHasta=${hasta}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as RankingProductos[];
  }
}