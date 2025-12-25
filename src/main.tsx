import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './Providers/AppProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import { route } from './components/Route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
 <RouterProvider router = {route} />
    </AppProvider>
  </StrictMode>,
)
