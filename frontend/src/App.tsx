import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
  path: '/',
  errorElement: <ErrorPage/>,
  children: [
  {
  index: true,
  element: <Login/>
  },
  {
  path: 'home',
  element: <Home/>
  },
  {
  path: 'reports',
  element: <Reports/>
  }
  ]
  },
 ]);
 

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
