import { EstadoPedido, PedidoDto } from "../types/Pedido/Pedido";
import formatDate from "../types/formats/dateFormat";
import { base } from "./BackendClient";
import { getToken } from "./TokenService";

export class PedidoService {
    protected baseUrl: string = base + "pedidos";

    //obtener próximos estados posibless
    async getEstadosPosibles(idPedido: number): Promise<EstadoPedido[]> {
        const response = await fetch(`${this.baseUrl}/${idPedido}/nextState`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as EstadoPedido[];
    }

    //obtener pedidos para cocina
    async getPedidosCocina(idSucursal: number): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/pedidosEnCocinaPorSucursal/${idSucursal}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    }

    //obtener pedidos para delivery
    async getPedidosDelivery(idSucursal: number): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/pedidosEnDeliveryPorSucursal/${idSucursal}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    }

    //obtener nuevos pedidos para caja
    async getPedidosNuevosCaja(idSucursal: number): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/pedidosIngresoCajaPorSucursal/${idSucursal}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    }

    //obtener pedidos en entrega para caja
    async getPedidosEntregaPendienteCaja(idSucursal: number): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/pedidosPendienteEntregaCaja/${idSucursal}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    }

    //cambiar el estado de un pedido
    async changeEstadoPedido(idPedido: number, estadoPedido: string) : Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/cambiaEstado/${idPedido}?estadoPedido=${estadoPedido}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                },
            }
        );
        return response.ok;
    }

    //obtener todos los pedidos por sucursal y estado
    async getAllBySucursalIdAndState(idSucursal: number, estadoPedido: string): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/getPorEstadoYSucursal/${idSucursal}?estadoPedido=${estadoPedido}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    }    

    //obtener todos los pedidos por sucursal en una fecha
    async getAllBySucursal(idSucursal: number, desde: Date, hasta: Date): Promise<PedidoDto[]> {
        const response = await fetch(`${this.baseUrl}/getPedidoSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`,{
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data as PedidoDto[];
    } 
}