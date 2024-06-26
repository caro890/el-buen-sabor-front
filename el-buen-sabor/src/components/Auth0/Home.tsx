import { Typography } from "@mui/material"
import logo from "../../images/logoBackgroundRemoved.png"

export const Home = () => {
  return (
    <div>
        <img src={logo} height={200} width={200}/>
        <Typography variant="h4" gutterBottom>
            ¡Bienvenido!
        </Typography>
        <Typography variant="h5" gutterBottom>
            Inicie sesión con el botón Log In
        </Typography>
    </div>
  )
}
