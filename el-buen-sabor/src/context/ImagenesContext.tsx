import { ReactNode, createContext, useState } from "react";
import { IImagen, ImageFile } from "../types/Articulos/ImagenArticulo";
import Swal from "sweetalert2";
import { ImagenesService } from "../services/ImagenesService";
import { extractPublicId } from "cloudinary-build-url";

interface ImagesContextType {
    setObjUrl: (url: string) => void, 
    setExistingImages: (array: IImagen[]) => void,
    toShowImages: ImageFile[],
    addToShowImages: () => void, 
    setSelectedFiles: (files: FileList | null) => void, 
    addImages: () => void, 
    deleteImage: (image: ImageFile) => void, 
    uploadImages: (idObject: number) => void
}

export const ImagesContext = createContext<ImagesContextType>({
    setObjUrl: () => {}, 
    setExistingImages: () => {},
    toShowImages: [],
    addToShowImages: () => {}, 
    setSelectedFiles: () => {}, 
    addImages: () => {}, 
    deleteImage: () => {}, 
    uploadImages: () => {}
});

export function ImagesContextProvider({ children } : { children: ReactNode }) {
    const[toShowImages, setToShowImages] = useState<ImageFile[]>([]);
    const[existingImages, setExistingImages] = useState<IImagen[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [toDeleteImages, setToDeleteImages] = useState<ImageFile[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [objUrl, setObjUrl] = useState<string>("");
    
    //change the states
    //transform existingImages into ImageFile and add them to toShowImages
    const addToShowImages = () => {
        let auxArray: ImageFile[] = [];
        existingImages.forEach((img: IImagen) => {
            let newImage: ImageFile = {
                imagen: img
            }
            auxArray.push(newImage);
        });
        setToShowImages(auxArray);
        
        console.log("Object URL: "+objUrl);
        console.log("Existing images: "+existingImages);
    };

    //transform selctedFiles into ImageFile and add it to toShowImages, add files to newImages
    const addImages = () => {
        if(selectedFiles){
            let auxToShow: ImageFile[] = toShowImages.slice();
            let auxNew: File[] = newImages.slice();

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
    
                auxToShow.push(newImageFile);
                auxNew.push(f);
            });
            setToShowImages(auxToShow);
            setNewImages(auxNew);
        }

        console.log("To Show Image: " + toShowImages);
        console.log("Selected Files: " + selectedFiles);
    };

    //remove from toShowImages, if it has a file we remove it from newImages if not add to toDeleteImages
    const deleteImage = (deleted: ImageFile) => {
        let auxToShow: ImageFile[] = toShowImages.slice();

        auxToShow = auxToShow.filter( (img: ImageFile ) => {
            return img != deleted;
        });

        setToShowImages(auxToShow);

        if(deleted.file){
            if(newImages.length!=0){
                let auxNew = Array.from(newImages).slice();

                auxNew = auxNew.filter( ( file ) => {
                    return file != deleted.file;
                });

                setNewImages(auxNew);
            }
        } else {
            setToDeleteImages(prev => [...prev, deleted]);
        }
    };  

    //change the db
    //save newImages into cloudinary and the db, setNewImages with the full images
    const uploadImages = async (idObject: number) => {
        //Crear un objeto FormData y agregar los archivos seleccionados
        if(newImages) {
            console.log(newImages);
            const formData = new FormData();
            newImages.forEach((file: File) => {
              formData.append("uploads", file);
            });
  
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
              var imgService = new ImagenesService(objUrl);
              await imgService.upload(idObject, formData);
              deleteImages();

              //cerrar el mensaje de espera
              Swal.close();
            } catch ( error ) {
              Swal.close();
              throw new Error();
            }
  
            reset();    //limpiar el estado de archivos para subir despues de la subida
        }
    };

    //delete toDeleteImages from cloudinary
    const deleteImages = () => {
        console.log("To Delete Images: " + toDeleteImages);
        let service = new ImagenesService(objUrl);
        toDeleteImages.forEach((img: ImageFile) => {
            //extraigo el ID publico de la URL de la imagen
            const match = extractPublicId(img.imagen.url);

            if(match){
                const publicId = match[1];
                try {
                    //Realizar la peticion post para eliminar la imagen
                    service.delete({id: img.imagen.id, publicId: publicId});
                } catch (error) {
                    throw new Error();
                }
            }
        });
    };

    //empty the states
    const reset = () => {
        setExistingImages([]);
        setNewImages([]);
        setToShowImages([]);
        setToDeleteImages([]);
        setSelectedFiles(new FileList());
        setObjUrl("");
    };

    return (
        <ImagesContext.Provider value={{toShowImages, setObjUrl, setExistingImages, addToShowImages, setSelectedFiles, addImages, deleteImage, uploadImages}}>
            { children }
        </ImagesContext.Provider>
    );
}