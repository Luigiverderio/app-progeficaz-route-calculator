import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import TelaMapa from './pages/Mapa/index.jsx'
import TelaLogin from './pages/Login/index.jsx'
import TelaFavoritas from './pages/Favoritas/index.jsx'
import TelaCadastro from './pages/Cadastro/index.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'

import './index.css'
import App from './App.jsx'

    
// Criando o BrowserRooter para redirecionar o user para as páginas certas
const router = createBrowserRouter([
  { path: '/' , element: <Navigate to="/login" replace></Navigate>},
  { path: '/login', element: <TelaLogin></TelaLogin>},
  { path: '/cadastro', element: <TelaCadastro></TelaCadastro>},
  { path: '/favoritas', element: <PrivateRoute><TelaFavoritas></TelaFavoritas></PrivateRoute>},
  { path: '/mapa', element: <PrivateRoute><TelaMapa></TelaMapa></PrivateRoute>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
