import { Base } from "../Base";
import { Sucursal } from "../Empresas/Sucursal";

export class Categoria extends Base{
    denominacion: string = "";
    categoriaPadre?: number;
    hijos?: Categoria[];
    esInsumo: boolean = false;
    //solo pasar ids
    sucursales?: number[];
}