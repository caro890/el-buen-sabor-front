import { FC } from "react";
import { IImagen } from "../../../types/Articulos/ImagenArticulo"
import { Card } from "react-bootstrap";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import styles from "../../../styles/Gallery.module.css"

interface IPropsGallery {
    images: IImagen[];
    handleDelete: (id: number, url: string) => void
}

export const Gallery : FC<IPropsGallery> = ({
    images,
    handleDelete
}) => {
  return (
    <div className={styles.galleryContainer} >
        {
            images?.map((image: IImagen) => (
                <Card key={image.id} className={styles.card}>
                    <div className={styles.containerImg}>
                        <Card.Img className={styles.img2} variant="top" src={image.url}></Card.Img>
                    </div>
                    <Card.Body>
                        <IconButton className={styles.btn + " text-success"} onClick={() => handleDelete(image.id, image.url)} >
                            <CIcon icon={cilTrash} size="xl"></CIcon>
                        </IconButton>
                    </Card.Body>
                </Card>
            ))
        }
    </div>
  )
}
