import { Base } from "../Base";

export class CategoriaCreate extends Base{
    denominacion: string = "";
    categoriaPadre?: number;
    esInsumo: boolean = false;
    sucursales?: number[];
}