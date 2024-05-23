import { Box, AppBar, Toolbar, Typography } from "@mui/material"

export const Navbar = () => {
  return (
    <Box className="navbar-box">
      <AppBar position="static" sx={{bgcolor: '#fb6376'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: 'center' }}
          >
            Buen Sabor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
