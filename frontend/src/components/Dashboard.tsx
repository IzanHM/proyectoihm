import React, { useEffect } from 'react'
import { useState } from 'react'
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid2'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'

///Creamos el tipo itemtype. Este tipo será un objeto con un id opcional de tipo number
//nombre, marca y tipo de tipo string y el precio de tipo number
interface ItemType {
    id?: number
    nombre: string
    marca: string
    tipo: string
    precio: number
  }

  //Inicializo los valores del item. Aquí no pongo el id porque no lo necesito
const itemInitialState: ItemType = {
    nombre: "",
    marca: "",
    tipo: "",
    precio: 0,
  }

function Dashboard() {

  const userData = useSelector((state: RootState) => state.authenticator)

    const [item, setItem] = useState(itemInitialState)
    const [tableData, setTableData] = useState([])
    const [mostrartable, setShowTable] = useState(true)
    
    useEffect(() => {
      if (mostrartable) {
        getItems()
        setShowTable(false)
      }
    }, [mostrartable])

    const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
          ...item,
          nombre: e.target.value,
        })
      }

      const handleChangeMarca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
          ...item,
          marca: e.target.value,
        })
      }

      const handleChangeTipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
          ...item,
          tipo: e.target.value,
        })
      }

      const handleChangePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
          ...item,
          precio: parseInt(e.target.value),
        })
      }

    const handleClear = () => {
    setItem(itemInitialState)
  }

  async function insertItem() {
     fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
      .then(response => response.json())
      .then(response => {
  
        if (response > 0) {
          alert('Datos guardados')
          setItem(itemInitialState)
          return true
        } else {
          alert('Error al insertar los datos.')
          return false 
        }
      })
      setShowTable(true)
  }

  async function getItems() {
    fetch(`http://localhost:3030/getItems`)
      .then(response => response.json())
      .then(response => {
        setTableData(response.data)
      })
  }

  async function deleteItem(row: ItemType) {
    fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
      .then(response => response.json())
      .then(response => {
        if (response > 0) {
          alert("Dato eliminado")
        }
      })
    setShowTable(true)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    insertItem()
  }

  function handleDelete(row: ItemType) {
    deleteItem(row)
  }

  return (
    <>
       <Container>
        <Box
        component="form"
        onSubmit={handleSubmit}
        >

        <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              value={item.nombre}
              onChange={handleChangeNombre}
            />
          </Grid>

        <Grid size={{xs:12, sm:6}}>
            <TextField
              required
              label="Marca"
              variant="outlined"
              fullWidth
              value={item.marca}
              onChange={handleChangeMarca}
            />
          </Grid>
            
          <Grid size={{xs:12, sm:6}}>
          <TextField
              required
              label="Tipo"
              variant="outlined"
              fullWidth
              value={item.tipo}
              onChange={handleChangeTipo}
            />
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <TextField
              required
              label="Precio"
              variant="outlined"
              type="number"
              fullWidth
              value={item.precio}
              onChange={handleChangePrecio}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={userData.userRol === 'invitado'}
            >
            Registrar producto 
            </Button>
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleClear}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
<br /><br /><br />
    <Container>
    <Typography variant="h3" color="secondary" sx={{ textAlign: "center", fontWeight: "bold"}}>DISPOSITIVOS ELECTRÓNICOS</Typography>
    <br /><br />
    <TableContainer>
    <Table aria-label="Tabla que muestra los dispositivos electrónicos">
    <TableHead>
    <TableRow>
    {userData.userRol === 'admin' && (
    <TableCell align="center">BORRAR</TableCell>
    )}
    <TableCell align="center">NOMBRE</TableCell>
    <TableCell align="center">MARCA</TableCell>
    <TableCell align="center">TIPO</TableCell>
    <TableCell align="center">PRECIO</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {tableData.map((row: ItemType) =>
      <TableRow key={row.id}>
    {userData.userRol === 'admin' && (
      <TableCell align="center">
      <IconButton onClick={() => handleDelete(row)}>
      <DeleteForeverIcon color="primary" />
      </IconButton>
      </TableCell>
    )}
      <TableCell align="center">{row.nombre}</TableCell>
      <TableCell align="center">{row.marca}</TableCell>
      <TableCell align="center">{row.tipo}</TableCell>
      <TableCell align="center">{row.precio}€</TableCell>
      </TableRow>
      )}
    </TableBody>
    </Table>
    </TableContainer>
    </Container>
    </>

  )
}

export default Dashboard