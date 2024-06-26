import { Box, AppBar, Toolbar, Typography } from "@mui/material"
import { useAppSelector } from "../../hooks/redux";
import LogoutButton from "../Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/LoginButton";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);

  return (
    <Box className="navbar border-bottom d-flex flex-row">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: 'center' }}
          >
            {empresaSelected?.nombre}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1, justifyContent: "space-evenly"}}>
            {
              isAuthenticated ? (
                <LogoutButton/>
              ) : (
                <LoginButton/>
              )
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
