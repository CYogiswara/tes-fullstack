import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import AppRoute from './appRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>,
)
