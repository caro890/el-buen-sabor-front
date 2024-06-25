import { Navbar } from "../../components/NavBar/Navbar";
import { Outlet } from "react-router";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../../styles/CajeroLayout.module.css"

export const CocineroLayout = () => {
  return (
    <div>
        <Navbar/>    
        
        <div className={styles.linksVistas + " mb-5"}>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="/cocinero-console">En Preparación</Link>
          </Typography>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="stock">Stock Insumos</Link>
          </Typography>
        </div>
        
        <Outlet/>
    </div>
  )
}
