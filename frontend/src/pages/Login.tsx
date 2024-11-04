import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LockIcon from '@mui/icons-material/Lock'
import Paper from '@mui/material/Paper'
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch()
  const [data, setData] = useState({ usuario: '', contraseña: '' })
  
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(data)

    if (data.usuario === 'IzanHM' && data.contraseña === 'Arguineguin') {
       // Usamos dispatch para lanzar la acción de login en el caso en que las credenciales sean correctas
      dispatch(authActions.login({
        name: data.usuario, //data.user es el nombre de usuario que ha ingresado el usuario
        rol: 'administrador'
       }))
      navigate('/home')
    } else {
      console.log('Usuario y/o contraseña incorrectos');
    }
  }

  const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      usuario: e.target.value,
    })
  }

  const handleChangeContraseña = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      contraseña: e.target.value,
    })
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '10px' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Sistema de acceso
        </Typography>

        <IconButton color="primary" aria-label="login icon" style={{ marginBottom: '20px' }}>
          <LockIcon fontSize="large" />
        </IconButton>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <TextField
            name="usuario"
            label="Usuario"
            variant="outlined"
            value={data.usuario}
            onChange={handleChangeUsuario}
            required
            fullWidth
          />

          <TextField
            name="contraseña"
            label="Contraseña"
            variant="outlined"
            type="password"
            value={data.contraseña}
            onChange={handleChangeContraseña}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Conectar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login