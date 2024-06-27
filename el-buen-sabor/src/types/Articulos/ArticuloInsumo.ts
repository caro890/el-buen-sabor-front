import { IBase } from "../Base";
import { Articulo, ArticuloCreate } from "./Articulo";
import { Categoria } from "./Categoria";
import { IImagen } from "./ImagenArticulo";
import { Stock, StockShort } from "./Stock";
import { UnidadMedida } from "./UnidadMedida";

export interface IArticuloInsumo extends IBase {
    precioCompra: number,
    esParaElaborar: boolean,
    stocksInsumo: StockShort[]
}

export class ArticuloInsumo extends Articulo implements IArticuloInsumo{
    precioCompra: number = 0;
    esParaElaborar: boolean = false;
    stocksInsumo: StockShort[] = [];
}

export interface ArticuloInsumoShort extends IBase {
    denominacion: string
}

export interface ArticuloInsumoCreate extends ArticuloCreate {
    precioCompra: number,
    stockActual: number,
    stockMaximo: number,
    stockMinimo: number,
    esParaElaborar: boolean
}

export interface ArticuloInsumoMezclado {
    id: number,
    eliminado: boolean,
    denominacion: string,
    precioVenta: number,
    precioCompra: number,
    esParaElaborar: boolean,
    codigo: string,
    habilitado: boolean,
    imagenes: IImagen[],
    idUnidadMedida?: number,
    idCategoria?: number,
    stockMinimo?: number,
    stockActual?: number, 
    stockMaximo?: number,
    unidadMedida?: UnidadMedida,
    categoria?: Categoria,
    stocksInsumo?: Stock[]
}