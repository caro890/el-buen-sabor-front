import { Base } from "../Base";
import { Sucursal } from "../Empresas/Sucursal";

export class Categoria extends Base{
    denominacion: string = "";
    categoriaPadre?: Categoria;
    hijos?: Categoria[];
    sucursales?: Sucursal[];
}