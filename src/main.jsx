import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './utils/Context.jsx'
import CartProvider from './utils/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </CartProvider>
)
