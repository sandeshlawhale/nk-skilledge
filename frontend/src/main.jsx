import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAuthStore } from './store/auth'
import { Toaster } from '@/components/ui/sonner'
import './index.css'

const router = createRouter({
  routeTree,
  context: {
    auth: undefined, // this is populated in App component
  },
})

function App() {
  const auth = useAuthStore()
  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <Toaster />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
