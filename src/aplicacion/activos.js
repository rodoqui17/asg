// Importa los componentes y estilos necesarios
import React, { useEffect, useState } from 'react';
import { Container, Table } from "react-bootstrap";
import NAVEGATION from "./navegation";
import axios from 'axios';
import { useAuth } from "../auth/auth";

 const baseURL = "https://backend-one-tawny-80.vercel.app/asg/asg";
//const baseURL = "http://localhost:3500/asg/asg";
function Activos() {
  const [respuestas, setRespuestas] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setRespuestas(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <NAVEGATION />
      <Container style={{ padding: '20px' }}>
        <header className="App-title mb-4">
          <h2>Activos Ambientales</h2>
        </header>
        <section className="mb-2">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Indicador</th>
                <th style={{ width: '20%' }}>Iniciativa</th>
                <th style={{ width: '20%' }}>Impacto Social</th>
                <th style={{ width: '20%' }}>Área de Impacto</th>
                <th style={{ width: '30%' }}>Certificado</th>
              </tr>
            </thead>
            <tbody>
              {respuestas.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.tipoIndicador}</td>
                  <td>{fila.nombre}</td>
                  <td>{fila.impactoSocial}</td>
                  <td>{fila.areaImpacto}</td>
                  <td>
                    <a href={fila.enlace}>{fila.identificador}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </Container>
    </div>
  );
}

export default Activos;
