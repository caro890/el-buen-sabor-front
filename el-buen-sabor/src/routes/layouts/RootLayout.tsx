import { Outlet } from "react-router-dom";
import "../../styles/Navbar.css"
import { Container } from "@mui/material";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "../../components/NavBar/Navbar";
import { jwtDecode } from "jwt-decode";

const RootLayout = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    if(isAuthenticated) {
      redirectToPage();
    }
  }, []);

  const redirectToPage = async () => {
    console.log("calling method")
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }
      })

      //localStorage.setItem("token", token);
      console.log(token);
      let decodedToken;
      if(token) decodedToken = jwtDecode(token);
      console.log(JSON.stringify(decodedToken));
      console.log(user?.subs);
      let roles = "";
      if(decodedToken) roles = decodedToken['https://my-app.example.com/roles'];

      if(roles.includes('ADMIN')) {
          navigate("admin-console")
        } else if(roles.includes('GERENTE')) {
          navigate("admin-dashboard")
        } else if(roles.includes('COCINERO')) {
          navigate("cocinero-console")
        } else if(roles.includes('CAJERO')) {
          navigate("cajero-console")
        } else if(roles.includes('DELIVERY')) {
          navigate("delivery-console");
        } else {
          alert("Usuario no autorizado")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <Container component="main" sx={{ flexGrow: 1, pl: 9, pt: 4}}>
        <Navbar/>
        <main className="w-100 d-flex justify-content-center align-items-center" >
          <Outlet/>
        </main>
      </Container>
  )
}

export default RootLayout;