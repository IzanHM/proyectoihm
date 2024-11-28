import Menu from '../components/Menu'
import Button from "@mui/material/Button"
import Container from '@mui/material/Container'
import { useState } from 'react'
import InformeColeccion from '../components/InformeColeccion'
import Tooltip from '@mui/material/Tooltip'

function Reports() {

  const [datosColeccion, setDatosColeccion] = useState([])
  const [mostrarInforme, setMostrarInforme] = useState(false)


  function getItems() {
    fetch(`http://localhost:3030/getItems`)
      .then((response) => response.json())
      .then((response) => {
        setDatosColeccion(response.data)
        setMostrarInforme(true)
      })
  }
 
  return (
    <>
      <Menu />
      <br /><br />
      <Container sx={{ textAlign: 'center' }}>
      <Tooltip title="Mostrar tabla de informes" placement="bottom" arrow>
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
      </Tooltip>
      </Container>
    </>
  )
}

export default Reports