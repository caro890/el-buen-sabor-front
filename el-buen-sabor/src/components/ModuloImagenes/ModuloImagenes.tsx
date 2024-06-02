import { useEffect, useState } from "react"
import { IImagen } from "../../types/Articulos/ImagenArticulo"
import { Gallery } from "./Gallery/Gallery"
import { UploadModule } from "./UploadModule/UploadModule"
import Swal from "sweetalert2"
import { ImagenesService } from "../../services/ImagenesService"
import { extractPublicId } from "cloudinary-build-url"
import { Articulo } from "../../types/Articulos/Articulo"

interface IPropsModuloImagenes<T extends Articulo> {
    imagenes: IImagen[],
    articulo: T
}

export const ModuloImagenes = <T extends Articulo>({
    imagenes,
    articulo
}: IPropsModuloImagenes<T> ) => {

  //estado para almacenar las imagenes
  const [images, setImages] = useState<IImagen[]>([]);

  //servicio de imagenes
  const service = new ImagenesService();

  //cargo las imagenes de las que obtengo por props
  useEffect(() => {
    if(imagenes.length != 0) {
      setImages(imagenes);
    } 
  }, [imagenes]);

  //Funcion para manejar la eliminacion de una imagen
  const handleDeleteImg = async (id: number, url: string) => {
    //extraigo el ID publico de la URL de la imagen
    const match = extractPublicId(url);
    console.log(match);

    if(match){
      const publicId = match[1];

      //Mostrar mensaje de eliminacion mientras se elimina la imagen
      Swal.fire({
        title: "Eliminando imagen...",
        text: "Espere mientras se elimina la imagen",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        //Realizar la peticion post para eliminar la imagen
        await service.delete({id: id, publicId: publicId});

        //Cerrar el mensaje de eliminacion despues de recibir la respuesta
        Swal.close();

        //Mostrar mensaje de exito
        Swal.fire({
          title: "Éxito",
          text: "Imagen eliminada con éxito",
          icon: "success"
        });

      } catch (error) {
        Swal.close();

        //Mostrar mensaje de error si la eliminacion fallo
        Swal.fire({
          title: "Error",
          text: "Algo falló al eliminar la imagen, intente nuevamente",
          icon: "error"
        });
      }
    }
  }

  return (
    <div className="mb-3">
        <UploadModule articuloId={articulo.id}></UploadModule>
        {imagenes.length!=0 ? <Gallery images={images} handleDelete={handleDeleteImg}></Gallery> : null}
    </div>
  )
}
