import { Button, Form, Card } from "react-bootstrap";
import styles from "../../styles/ModuloImagenes.module.css"
import { useEffect, useState } from "react"
import { IImagen } from "../../types/Articulos/ImagenArticulo"
import Swal from "sweetalert2"
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
//import { ImagenesService } from "../../services/ImagenesService";

/**- state for eliminated images that were already in the cloud to eliminate them when the user presses GUARDAR

- issue with updating the state of files when the user uploads an image and then deletes it.
 */

interface ImageFile {
    imagen: IImagen,
    file?: File
}

interface IPropsModuloImagenes {
    imagenes: IImagen[],
    files: File[] | null,
    setFiles: (array: File[]) => void
}

export const ModuloImagenes = ({
    imagenes,
    files,
    setFiles
}: IPropsModuloImagenes ) => {

  //estado para almacenar las imagenes a mostrar
  const [images, setImages] = useState<ImageFile[]>([]);

  //estado para almacenar archivos seleccionados para subir
  const [selectedFiles, setSelectedFiles]  = useState<FileList | null>(null);

  //cargo las imagenes de las que obtengo por props
  useEffect(() => {
    console.log("Getting the images");
    if(imagenes.length != 0) {
      var imagesArray: ImageFile[] = [];

      imagenes.forEach((img) => {
        var newImageFile: ImageFile = {imagen: img};
        imagesArray.push(newImageFile);
      });

      setImages(imagesArray);
    } /*else {
        var service = new ImagenesService();

        service.getAll().then((data) => {
            var imagesArray: ImageFile[] = [];

            data.forEach((img) => {
                var newImageFile: ImageFile = {imagen: img};
                imagesArray.push(newImageFile);
            });

            setImages(imagesArray);
        });
    }*/
  }, []);
    
  //Manejador de cambio de archivos seleccionados 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const addFiles = () => {
    if (!selectedFiles) {
        //Mostrar mensaje de advertencia si no se seleccionaron archivos
        return Swal.fire(
            "No hay imágenes seleccionadas",
            "Selecciona al menos una imagen",
            "warning"
        );
    }

    setFiles(Array.from(selectedFiles));

    //add to images
    var imagesArray: ImageFile[] = images.slice();

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

        console.log(newImageFile);
        imagesArray.push(newImageFile);
    });

    setImages(imagesArray);
  };

  const deleteFile = async (eliminado: ImageFile) => {
    console.log(eliminado.file);
    if(eliminado.file){
        if(files){
            var arrayFiles = Array.from(files).slice();

            arrayFiles = arrayFiles.filter( ( file ) => {
                return file != eliminado.file;
            });
            console.log(arrayFiles);

            setFiles(arrayFiles);
            console.log(files);
        }
    } 

    //delete from images
    var imagesArray: ImageFile[] = images.slice();

    imagesArray = imagesArray.filter( (img: ImageFile ) => {
        return img != eliminado;
    });

    setImages(imagesArray);
  };

  return (
    <div className="mb-3">
        <div className={styles.uploadContainer}>
            <Form.Control 
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <Button className={styles.btnUpload} type="button" onClick={addFiles}>AÑADIR</Button>
        </div>
            { images.length != 0 ? (<div className={styles.galleryContainer} > 
                {
                images?.map((image: ImageFile, index: number) => (
                    <Card key={index} className={styles.card}>
                        <div className={styles.containerImg}>
                            <Card.Img className={styles.img2} variant="top" src={image.imagen.url}></Card.Img>
                        </div>
                        <Card.Body>
                            <IconButton className={styles.btn + " text-success"} onClick={() => deleteFile(image)} >
                                <CIcon icon={cilTrash} size="xl"></CIcon>
                            </IconButton>
                        </Card.Body>
                    </Card>
                )) 
                }
            </div>
            )
            : null}
    </div>
  )
}
