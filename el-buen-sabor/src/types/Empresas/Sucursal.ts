import { IBase } from "../Base";
import { Domicilio } from "../Domicilio/Domicilio";
import { Empresa } from "./Empresa";

export interface Sucursal extends IBase{
    nombre: string,
    horarioApertura: string,
    horarioCierre: string,
    domicilio: Domicilio,
    empresa: Empresa
}