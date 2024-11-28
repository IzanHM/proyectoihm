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
import { authActions } from '../store/authSlice'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'

function Login() {
  const dispatch = useDispatch()
  const [data, setData] = useState({ usuario: '', contraseña: '' })
  
  const [error, setError] = useState('')

  const navigate = useNavigate()

  async function isVerifiedUser () {
    fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contraseña}`)
    .then(response => response.json())
    .then (response => {
      console.log('Lo que nos llega de la base de datos: ')
      console.log(response.data)
      if (response.data.length !== 0) {
        dispatch(authActions.login({
          name: data.usuario, //data.user es el nombre de usuario que ha ingresado el usuario
          rol: response.data.rol
         }))
        navigate('/home')
      } else {
        setError('Usuario y/o contraseña incorrectos')
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //console.log(data)
    isVerifiedUser()
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

          {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
          {error}
          </Alert>
          )}
          <Tooltip title="Acceder a la página" placement="bottom" arrow>
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Conectar
          </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login