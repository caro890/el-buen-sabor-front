import { Base } from "../Base";

export class CategoriaCreate {
    denominacion: string = "";
    idCategoriaPadre?: number;
    esInsumo: boolean = false;
    idSucursales?: number[];
}