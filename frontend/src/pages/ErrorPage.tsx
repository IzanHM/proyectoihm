import { useRouteError } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Definimos un tipo para el error esperado
type RouteError = {
  statusText?: string
  message?: string
}

function ErrorPage() {
  const error = useRouteError() as RouteError

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Algo salió mal
      </Typography>
      <Typography variant="body1" gutterBottom>
        No hemos podido encontrar la página que estás buscando
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {error?.statusText || error?.message || "Error desconocido"}
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Volver a la página de inicio
      </Button>
    </Container>
  )
}

export default ErrorPage