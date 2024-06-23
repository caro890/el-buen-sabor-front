import { base } from "./BackendClient";

export class ImagenesService {
    baseUrl: string;

    constructor(objUrl: string) {
        this.baseUrl = base + objUrl;
    }
    
    async delete(image: {id: number, publicId: string}) {
        var url: string = this.baseUrl + "/deleteImg" + `?publicId=${image.publicId}&id=${image.id}` ;
        const response = await fetch(url, {
            method: "POST"
        })
        if (!response.ok) {
            throw new Error("Error al eliminar la imagen");
        }
    }

    async upload(idArticulo: number, formData: FormData){
        var url: string = this.baseUrl + `/uploads/${idArticulo}` ;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
            throw new Error("Error al cargar las imagenes");
        }
    }
}