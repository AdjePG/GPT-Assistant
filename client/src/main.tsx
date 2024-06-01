import ReactDOM from 'react-dom/client'
import TranslatorPage from './pages/TranslatorPage/TranslatorPage.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext.tsx'
import RecipesPage from './pages/RecipesPage/RecipesPage.tsx'
import App from './App.tsx'

const routes = [
  {
    path: '/translator',
    element: <App>
      <TranslatorPage />
    </App>,
    errorElement: <h1>404: Not found! 😭</h1>
  }, {
    path: '/recipes',
    element: <App>
      <RecipesPage />
    </App>,
    errorElement: <h1>404: Not found! 😭</h1>
  }, {
    path: '*',
    element: <Navigate to="/translator" replace />
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <RouterProvider router={router} />
  </ToastProvider>
)
