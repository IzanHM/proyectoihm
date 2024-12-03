import Menu from '../components/Menu'
import Button from "@mui/material/Button"
import Container from '@mui/material/Container'
import { useState } from 'react'
import InformeColeccion from '../components/InformeColeccion'
import InformeUsuario from '../components/InformeUsuario'


function Reports() {

  const [datosColeccion, setDatosColeccion] = useState([])
  const [datosUsuarios, setDatosUsuarios] = useState([])
  const [mostrarInforme, setMostrarInforme] = useState(false)
  const [mostrarInformeusuario, setMostrarInformeusuario] = useState(false)


  function getItems() {
    fetch(`http://localhost:3030/getItems`)
      .then((response) => response.json())
      .then((response) => {
        setDatosColeccion(response.data)
        setMostrarInforme(true)
      })
  }
 
  function getusers() {
    fetch(`http://localhost:3030/getuser`)
      .then((response) => response.json())
      .then((response) => {
        setDatosUsuarios(response.data)
        setMostrarInformeusuario(true)
      })
  }

  return (
    <>
      <Menu />
      <br /><br />
      <Container sx={{ textAlign: 'center' }}>
        
        {mostrarInforme ? (
          <InformeColeccion datos={datosColeccion} />) 
          : (<Button
            color="secondary"
            variant="contained"
            onClick={getItems} 
          >
            Informes colección
          </Button>
        )}
      </Container>
      <br /><br />
      <Container sx={{ textAlign: 'center' }}>
        {mostrarInformeusuario ? (
          <InformeUsuario datos={datosUsuarios} />) 
          : (<Button
            color="secondary"
            variant="contained"
            onClick={getusers} 
          >
            Informes Usuarios
          </Button>
        )}
      </Container>
    </>
  )
}

export default Reports