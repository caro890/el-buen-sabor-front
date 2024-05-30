import { Base, IBase } from "../Base";

export interface IImagen extends IBase {
    url: string,
}

export class ImagenArticulo extends Base implements IImagen {
    url: string = "";
}