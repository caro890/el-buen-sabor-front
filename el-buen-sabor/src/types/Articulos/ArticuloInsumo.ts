import { IBase } from "../Base";
import { Articulo } from "./Articulo";

export interface IArticuloInsumo extends IBase {
    precioCompra: number,
    stockActual: number,
    stockMaximo: number,
    esParaElaborar: boolean
}

export class ArticuloInsumo extends Articulo implements IArticuloInsumo{
    precioCompra: number = 0;
    stockActual: number = 0;
    stockMaximo: number = 0;
    esParaElaborar: boolean = false;
}