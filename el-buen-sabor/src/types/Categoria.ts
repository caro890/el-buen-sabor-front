import { Base } from "./Base";

export class Categoria extends Base{
    denominacion: string = "";
    padre?: Categoria;
    hijos?: Categoria[];
}