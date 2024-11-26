import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid2'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { useState } from 'react'
import Typography from "@mui/material/Typography"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import React, { useEffect } from 'react'


interface ItemType {
    id?: number
    nombre: string
    login: string
    password: string
    rol: string
  }

  const userInitialState: ItemType = {
    nombre: "",
    login: "",
    password: "",
    rol: "",
  }

function Dashboardusuarios () {

    const [user, setuser] = useState(userInitialState)
    const [tableData, setTableData] = useState([])
    const [mostrartable, setShowTable] = useState(true)

    useEffect(() => {
        if (mostrartable) {
          getItems()
          setShowTable(false)
        }
      }, [mostrartable])

    async function insertuser() {
        fetch(`http://localhost:3030/adduser?nombre=${user.nombre}&login=${user.login}&password=${user.password}&rol=${user.rol}`)
         .then(response => response.json())
         .then(response => {
     
           if (response > 0) {
             alert('Datos guardados')
             setuser(userInitialState)
             return true
           } else {
             alert('Error al insertar los datos.')
             return false 
           }
         })
         setShowTable(true)
     }

     async function getItems() {
        fetch(`http://localhost:3030/getuser`)
          .then(response => response.json())
          .then(response => {
            setTableData(response.data)
          })
      }

    const handleChangenombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser({
          ...user,
          nombre: e.target.value,
        })
      }

      const handleChangelogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser({
          ...user,
          login: e.target.value,
        })
      }

      const handleChangepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser({
          ...user,
          password: e.target.value,
        })
      }

      const handleChangerol = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser({
          ...user,
          rol: e.target.value,
        })
      }

      const handleSubmit = (e: any) => {
        e.preventDefault()
        insertuser()
      }

      const handleClear = () => {
        setuser(userInitialState)
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
              label="nombre"
              variant="outlined"
              fullWidth
              value={user.nombre}
              onChange={handleChangenombre}
            />
          </Grid>

        <Grid size={{xs:12, sm:6}}>
            <TextField
              required
              label="login"
              variant="outlined"
              fullWidth
              value={user.login}
              onChange={handleChangelogin}
            />
          </Grid>
            
          <Grid size={{xs:12, sm:6}}>
          <TextField
              required
              label="password"
              variant="outlined"
              fullWidth
              value={user.password}
              onChange={handleChangepassword}
            />
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <TextField
              required
              label="rol"
              variant="outlined"
              fullWidth
              value={user.rol}
              onChange={handleChangerol}
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
            >
            Registrar usuario 
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
    <Typography variant="h3" color="secondary" sx={{ textAlign: "center", fontWeight: "bold"}}>USUARIOS REGISTRADOS</Typography>
    <br /><br />
    <TableContainer>
    <Table aria-label="Tabla que muestra los dispositivos electrónicos">
    <TableHead>
    <TableRow>
    <TableCell align="center">NOMBRE</TableCell>
    <TableCell align="center">LOGIN</TableCell>
    <TableCell align="center">PASSWORD</TableCell>
    <TableCell align="center">ROL</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {tableData.map((row: ItemType) =>
      <TableRow key={row.id}>
      <TableCell align="center">{row.nombre}</TableCell>
      <TableCell align="center">{row.login}</TableCell>
      <TableCell align="center">{row.password}</TableCell>
      <TableCell align="center">{row.rol}</TableCell>
      </TableRow>
      )}
    </TableBody>
    </Table>
    </TableContainer>
    </Container>
        </>
    )
}

export default Dashboardusuarios