import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import HomePage from "./pages/HomePage.jsx"
import ProductPage from './pages/ProductPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
