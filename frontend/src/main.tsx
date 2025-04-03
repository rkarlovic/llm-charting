import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Terms from './pages/Terms'

//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
