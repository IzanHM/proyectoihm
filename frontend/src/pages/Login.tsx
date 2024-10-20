import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Login () {

    return (

        <>
        
        <main role="main">
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>

      <Typography variant="h1" color="primary" gutterBottom>
        Bienvenido
      </Typography>

      <Typography variant="h2" color="secondary" gutterBottom>
        Hola Mundo
      </Typography>

      <Typography variant="h3" color="success" gutterBottom>
        SI SE PUEDE
      </Typography>

      <Typography variant="subtitle1" color="info" gutterBottom>
        Indique la contraseña
      </Typography>

      <Typography variant="body1" color="textSecondary" gutterBottom>
        Esto es un ejemplo de un texto con variante body1 y color secundario.
      </Typography>

      <Button variant="text" color="primary" style={{ margin: '10px' }}>
        Texto Primario
      </Button>

      <Button variant="contained" color="secondary" style={{ margin: '10px' }}>
        Contained Secundario
      </Button>

      <Button variant="outlined" color="success" style={{ margin: '10px' }}>
        Outlined Exitoso
      </Button>

      <Button variant="contained" color="error" style={{ margin: '10px' }}>
        Contained Error
      </Button>

      <Button variant="outlined" color="info" style={{ margin: '10px' }}>
        Outlined Info
      </Button>
    </Container>
    </main>
        </>

    )
}

export default Login