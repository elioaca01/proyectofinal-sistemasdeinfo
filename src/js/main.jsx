import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from "./layout.jsx"

// import App from '../../prueba/src/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
