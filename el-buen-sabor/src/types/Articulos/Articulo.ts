import { Base, IBase } from "../Base";
import { Categoria } from "./Categoria";
import { ImagenArticulo } from "./ImagenArticulo";
import { UnidadMedida } from "./UnidadMedida";

export interface IArticulo extends IBase {
    denominacion: string,
    precioVenta: number,
    imagenes?: ImagenArticulo[],
    unidadMedida: UnidadMedida,
    categoria: Categoria,
    codigo: string,
    habilitado: boolean
}

export class Articulo extends Base implements IArticulo {
    denominacion: string = "";
    precioVenta: number = 0;
    imagenes?: ImagenArticulo[];
    unidadMedida: UnidadMedida = new UnidadMedida();
    categoria: Categoria = new Categoria();
    codigo: string = "";
    habilitado: boolean = true;
}