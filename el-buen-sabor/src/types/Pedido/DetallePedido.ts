import { ArticuloShort } from "../Articulos/Articulo";
import { IBase } from "../Base";

export interface DetallePedidoDto extends IBase {
    cantidad: number,
    subTotal: number,
    articulo: ArticuloShort
}
