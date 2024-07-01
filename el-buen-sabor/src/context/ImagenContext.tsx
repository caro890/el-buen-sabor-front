import { ReactNode, createContext, useState } from "react";
import { IImagen, ImageFile } from "../types/Articulos/ImagenArticulo";
import Swal from "sweetalert2";
import { ImagenesService } from "../services/ImagenesService";
import { imageFileVacio } from "../types/TiposVacios";

interface ImageContextType {
    setObjUrl: (url: string) => void, 
    toShowImage: ImageFile,
    addToShowImage: (image: IImagen) => void, 
    setSelectedFiles: (files: FileList | null) => void, 
    addImage: () => void, 
    deleteImage: (image: ImageFile) => void, 
    uploadOneImage: () => Promise<string | undefined> ,
    reset: () => void
}

export const ImageContext = createContext<ImageContextType>({
    setObjUrl: () => {}, 
    toShowImage: imageFileVacio,
    addToShowImage: () => {}, 
    setSelectedFiles: () => {}, 
    addImage: () => {}, 
    deleteImage: () => {}, 
    uploadOneImage: async () => {return ""},
    reset: () => {}
});

export function ImageContextProvider({ children } : { children: ReactNode }) {
    const [toShowImage, setToShowImage] = useState<ImageFile>(imageFileVacio);
    const [newImage, setNewImage] = useState<FormData>(new FormData());
    const [toDeleteImage, setToDeleteImage] = useState<ImageFile>(imageFileVacio);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [objUrl, setObjUrl] = useState<string>("");
    
    const addToShowImage = (image: IImagen) => {
        let newImage: ImageFile = {
            imagen: image
        }
        setToShowImage(newImage);
    };

    const addImage = () => {
        if(selectedFiles?.length==1){
            let auxNew: FormData = newImage;

            Array.from(selectedFiles).forEach((f: File) => {
                var newName = f.name;
                var newURL = URL.createObjectURL(f);
    
                var newImagen: IImagen = {
                    id: 0,
                    eliminado: false,
                    name: newName,
                    url: newURL
                }
    
                var newImageFile: ImageFile = {
                    imagen: newImagen,
                    file: f
                }
    
                setToShowImage(newImageFile);
                auxNew.append("uploads", f);
            });

            setNewImage(auxNew);
        } else {
            return Swal.fire({
                title: "Solo se permite cargar una imagen",
                text: "Intente cargando un solo archivo",
                icon: "error"
            });
        }
    };

    const deleteImage = (deleted: ImageFile) => {
        setToShowImage(imageFileVacio);

        if(deleted.file){
            if(newImage.has("uploads")){
                let auxNew = newImage;
                auxNew.delete("uploads");
                setNewImage(auxNew);
            }
        } else {
            setToDeleteImage(deleted);
        }
    };  

    const uploadOneImage = async () => {
        if(newImage.has("uploads")) {
            console.log(newImage);
  
            //Mostrar un mensaje de carga mientras se suben los archivos
            Swal.fire({
                title: "Guardando imagénes...",
                text: "Espere mientras se guardan las imágenes",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
  
            try {
                //Realizar la peticion POST para subir los archivos
                let imgService = new ImagenesService(objUrl);
                
                const response = await imgService.uploadOne(newImage);
                if (!response.ok) {
                    return;
                }
                return response.json();
               //cerrar el mensaje de espera
               Swal.close();
             } catch ( error ) {
               Swal.close();
               throw new Error();
             }
        }
        if(toDeleteImage){
            deleteImages();
        }
        return "";
     };

    const deleteImages = () => {
        let service = new ImagenesService(objUrl);
            console.log(toDeleteImage.imagen.url);
    
            // Extraigo el ID público de la URL de la imagen
            const match = extraerPublicId(toDeleteImage.imagen.url);
            console.log(match);
    
            if (match && match[1]) {
                const publicId = match[1];
                console.log(match[1])
                try {
                    // Realizar la petición POST para eliminar la imagen
                     service.delete({ id: toDeleteImage.imagen.id, publicId: publicId });
                } catch (error) {
                    console.error("Error al eliminar la imagen:", error);
                }
            } else {
                console.error("No se pudo extraer el publicId de la URL:", toDeleteImage.imagen.url);
            }
    };

    const extraerPublicId = (url: string): RegExpMatchArray | null => {
        const regex = /\/upload\/(.+?)$/;
        return url.match(regex);
    };

    //empty the states
    const reset = () => {
        setNewImage(new FormData());
        setToShowImage(imageFileVacio);
        setToDeleteImage(imageFileVacio);
        setSelectedFiles(new FileList());
        setObjUrl("");
    };

    return (
        <ImageContext.Provider value={{toShowImage, setObjUrl, addToShowImage, setSelectedFiles, addImage, deleteImage, uploadOneImage, reset}}>
            { children }
        </ImageContext.Provider>
    );
}