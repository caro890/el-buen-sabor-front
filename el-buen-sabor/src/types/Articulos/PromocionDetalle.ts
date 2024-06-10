import { Base } from "../Base";
import { ArticuloInsumo } from "./ArticuloInsumo";
import { ArticuloManufacturado } from "./ArticuloManufacturado";

export interface PromocionDetalle extends Base {
    cantidad: number,
    articulo: ArticuloInsumo | ArticuloManufacturado
}

/*export class PromocionDetalle implements PromocionDetalle {
    id: number = 0;
    eliminado: boolean = false;
    cantidad: number = 0;
}*/

export class PromocionDetalleClass {
    public static createFrom(viejo: PromocionDetalle, nuevo: PromocionDetalle) : PromocionDetalle {
        nuevo.id = viejo.id;
        nuevo.eliminado = viejo.eliminado;
        nuevo.cantidad = viejo.cantidad;
        nuevo.articulo = viejo.articulo;
        return nuevo;
    }
}