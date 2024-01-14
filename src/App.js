import React from "react";
import LOGIN from './aplicacion/login';
import PANEL from './aplicacion/panel';
import ACTIVOS from "./aplicacion/activos";
import VALIDAR from "./aplicacion/validar";
import CARGACTIVO from "./aplicacion/carga_activo";
import { AuthProvider } from "./auth/auth";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import {
//   Routes,
//   Route,
//   NavLink,
//   Navigate,
//   useNavigate,
// } from 'react-router-dom';
function App() {

  // const ROLES = {
  //   'User': 2001,
  //   'Editor': 1984,
  //   'Admin': 5150
  // }
  return (
    <AuthProvider>
      <Router>

        <Routes>

          <Route exact path="/" element={<LOGIN />} />
          <Route exact path="/panel" element={<PANEL />} />
          <Route exact path="/activos" element={<ACTIVOS />} />
          <Route exact path="/validar" element={<VALIDAR />} />
          <Route exact path="/nuevoactivo" element={<CARGACTIVO />} />
          {/*<Route path="*" element={<NotFound/>}/> */}

          
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
