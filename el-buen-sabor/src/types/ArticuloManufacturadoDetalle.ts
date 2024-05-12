import { Base } from "./Base";
import { ArticuloInsumo } from "./ArticuloInsumo";

export class ArticuloManufacturadoDetalle extends Base{
    cantidad: number = 0;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
}