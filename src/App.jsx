import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login';
import RegistroPage from './registro';
import InicioPage from './inicio';
function App() {


  return (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/inicio" element={<InicioPage />} />
    </Routes>
  </Router>
  )
}

export default App
