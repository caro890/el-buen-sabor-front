import { Base } from "../Base";
import { Sucursal } from "../Empresas/Sucursal";
import { IImagen } from "./ImagenArticulo";
import { PromocionDetalle } from "./PromocionDetalle";

export enum TipoPromocion {
    HAPPY_HOUR = "HAPPY_HOUR",
    PROMOCION = "PROMOCION"
}

export interface Promocion extends Base {
    denominacion: string,
    fechaDesde: Date,
    fechaHasta: Date,
    horaDesde: Date,
    horaHasta: Date,
    habilitado: boolean,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: TipoPromocion, //!

    promocionDetalles: PromocionDetalle[],
    imagenes?: IImagen[],
    sucursales?: Sucursal[] //!
}