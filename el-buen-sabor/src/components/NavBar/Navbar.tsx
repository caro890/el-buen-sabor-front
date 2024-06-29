import { Box, AppBar, Toolbar, Typography } from "@mui/material"
import { useAppSelector } from "../../hooks/redux";
import LogoutButton from "../Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/LoginButton";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);
  const sucursalSelected = useAppSelector((state) => state.sucursalReducer.sucursal);

  return (
    <Box className="navbar border-bottom d-flex flex-row">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", flexDirection: "row", flexGrow: 1, justifyContent: "space-between"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: 'center' }}
          >
            {empresaSelected?.nombre}&nbsp;-&nbsp;{sucursalSelected?.nombre}
          </Typography>
            {
              isAuthenticated ? (
                <div style={{ display: "flex", flexDirection: "row", flexGrow: 1, justifyContent: "flex-end", alignItems: "center"}}>
                  <div>{user?.name}</div>&nbsp;&nbsp;<LogoutButton/>
                </div>
              ) : (
                <LoginButton/>
              )
            }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
