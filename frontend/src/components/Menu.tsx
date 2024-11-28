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
import {Link} from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { authActions } from '../store/authSlice';
import Tooltip from '@mui/material/Tooltip'


function Menu () {

const [open, setOpen] = React.useState(false)

const userData = useSelector((state: RootState) => state.authenticator)

const dispatch = useDispatch()
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

  const handleLogout = ()=>{
    dispatch(authActions.logout(
    ))
    navigate ('/')
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <Link to={'/home'} style={{textDecoration:'none', color:'black'}}>
      <Tooltip title="Acceder a página Home" placement="right" arrow>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
      </Tooltip>
      </Link>

      {userData.userRol === 'admin' && (
      <Link to={'/reports'} style={{textDecoration:'none', color:'black'}}>
      <Tooltip title="Acceder a página Informes" placement="right" arrow>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon/>
            </ListItemIcon>
            <ListItemText primary="Informes" />
          </ListItemButton>
        </ListItem>
      </Tooltip>
      </Link>
      )}
      
      <Link to={'/Manual_Usuario.pdf'} target='_blank'>
      <Tooltip title="Descargar manual de usuario" placement="right" arrow>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItemButton>
        </ListItem>
      </Tooltip>
      </Link>

      </List>
      <Divider />
      <List>
      <Tooltip title="Regresar a login" placement="right" arrow>
      <ListItem disablePadding>
          <ListItemButton onClick ={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </Tooltip>
      </List>
    </Box>
  );

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Tooltip title="Menú de acceso a páginas" placement="right" arrow>
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
        </Tooltip>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {userData.userName}
            </Typography>

        <Tooltip title="Icono en función del rol" placement="left" arrow>
          <IconButton color="inherit">
              {userData.userRol === 'admin' ? <AdminPanelSettingsIcon /> : <AccountCircleIcon />}
            </IconButton>
        </Tooltip>
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