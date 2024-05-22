import { Base } from "../Base";
import { Categoria } from "./Categoria";
import { ImagenArticulo } from "./ImagenArticulo";
import { UnidadMedida } from "./UnidadMedida";

export class Articulo extends Base {
    denominacion: string = "";
    precioVenta: number = 0;
    imagenes?: ImagenArticulo[];
    unidadMedida: UnidadMedida = new UnidadMedida();
    categoria: Categoria = new Categoria();
    codigo: string = "";
}