import { FC, useState } from "react"
import Swal from "sweetalert2";
import { ImagenesService } from "../../../services/ImagenesService";
import { Button, Form } from "react-bootstrap";
import styles from "../../../styles/UploadModule.module.css"

interface IPropsUploadModule {
  articuloId: number
}

export const UploadModule : FC<IPropsUploadModule> = ({
  articuloId
}) => {
  //estado para almacenar archivos seleccionados para subir
  const [selectedFiles, setSelectedFiles]  = useState<FileList | null>(null);

  //servicio de imagenes
  const service = new ImagenesService();

  //Manejador de cambio de archivos seleccionados 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  //Funcion asincronica para subir archivos al servidor
  const uploadFiles = async () => {
    if (!selectedFiles) {
        //Mostrar mensaje de advertencia si no se seleccionaron archivos
        return Swal.fire(
            "No hay imágenes seleccionadas",
            "Selecciona al menos una imagen",
            "warning"
        );
    }

    //Crear un objeto FormData y agregar los archivos seleccionados
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("uploads", file);
    });

    //Mostrar un mensaje de carga mientras se suben los archivos
    Swal.fire({
        title: "Subiendo imágenes...",
        text: "Espere mientras se suben los archivos.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        //Realizar la peticion POST para subir los archivos
        await service.upload(articuloId, formData);

        //cerrar el mensaje de espera
        Swal.close();

        //Mostrar mensaje de exito si la subida es exitosa
        Swal.fire({
          title:  "Éxito",
          text: "Imágenes subidas correctamente",
          icon: "success"
        });

    } catch ( error ) {
      Swal.close();

      //Mostrar mensaje de error si ocurre una exepcion
      Swal.fire({
          title: "Error",
          text: "Algo falló al intentar subir las imágenes",
          icon: "error"
      });
      console.log("Error: ", error);
    }

    setSelectedFiles(null); //limpiar el estado de archivos seleccionados despues de la subida
  };

  return (
    <div className={styles.uploadContainer}>
        <Form.Control 
            type="file"
            multiple
            onChange={handleFileChange}
        />
        <Button className={styles.btnUpload} type="button" onClick={uploadFiles}>SUBIR</Button>
    </div>
  )
}
