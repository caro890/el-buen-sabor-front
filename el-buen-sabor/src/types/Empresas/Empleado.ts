import { IImagen } from "../Articulos/ImagenArticulo";
import { IBase } from "../Base";
import { Sucursal } from "./Sucursal";

export enum Rol {
    ADMIN = "ADMIN",
    CLIENTE = "CLIENTE",
    COCINERO = "COCINERO",
    CAJERO = "CAJERO",
    DELIVERY = "DELIVERY",
    GERENTE = "GERENTE"
}

export interface Usuario extends IBase {
    auth0Id: string,
    username: String,
    email: String,
    rol: Rol 
}

interface Persona extends IBase {
    nombre: String,
    apellido: String,
    telefono: String,
    fechaNacimiento: Date,

    usuario: Usuario,
    imagenPersona?: IImagen
}

export interface Empleado extends Persona {
    //pedidos: Pedido[]
    sucursal: Sucursal;
}