import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import DescriptionIcon from '@mui/icons-material/Description'
import HelpIcon from '@mui/icons-material/Help'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link} from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Menu () {

const [open, setOpen] = React.useState(false)

const userData = useSelector((state: RootState) => state.authenticator)

const navigate = useNavigate()
const isLoggedin = userData.isAutenticated

useEffect(() => {
  if (!isLoggedin) {
   navigate('/')
   }
   }, [isLoggedin, navigate])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <Link to={'/home'} style={{textDecoration:'none', color:'black'}}>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'/reports'} style={{textDecoration:'none', color:'black'}}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon/>
            </ListItemIcon>
            <ListItemText primary="Informes" />
          </ListItemButton>
        </ListItem>
      </Link>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List>
      <Link to={'/'} style={{textDecoration:'none', color:'black'}}>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </Link>
      </List>
    </Box>
  );

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Nombre del usuario logueado */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {userData.userName}
            </Typography>

          {/* Icono del rol */}
          <IconButton color="inherit">
              {userData.userRol === 'admin' ? <AdminPanelSettingsIcon /> : <AccountCircleIcon />}
            </IconButton>

        </Toolbar>
      </AppBar>
    </Box>

    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
        </>
    )
}

export default Menu