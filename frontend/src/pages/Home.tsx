import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
// Importamos useDispatch para enviar acciones al store
import { useDispatch } from 'react-redux';
// Importamos useNavigate para redirigir al usuario
import { useNavigate } from 'react-router-dom';

function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
 const userData = useSelector((state: RootState) => state.authenticator)

 // Función que maneja el logout
 const handleLogout = () => {
  // Cambia el estado global a logout
  dispatch(authActions.logout());
  // Redirige a la página principal
  navigate('/');
};

 //Comprobamos por la consola qué obtenemos del store
 console.log(userData)
 
  return (
    
    <>
    <Typography variant="h2">Página Home de Izan Nicolás Hernández Morales</Typography>
    <Typography variant="h5" color="textSecondary">
        Bienvenido, {userData.userName}. Tu rol es: {userData.userRol}.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogout} 
        style={{ marginTop: '20px' }}
      >
        SALIR
      </Button>
    </>

  )
}

export default Home