// Importa los componentes y estilos necesarios
import React, { useEffect, useState } from 'react';
import { Container, Table } from "react-bootstrap";
import NAVEGATION from "./navegation";
import axios from 'axios';
import { useAuth } from "../auth/auth";

const baseURL = "https://r3colectaback.herokuapp.com/asg/asg";

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
            <Container style={{ padding: "20px" }}>
                <header className="App-title mb-4">
                    <h2>CERTIFICADOS CREADOS {auth.user}</h2>
                </header>
                <section className="mb-4">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Indicador</th>
                                <th>Material</th>
                                <th>Peso</th>
                                <th>Valor</th>
                                <th>Certificado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {respuestas.map((fila, index) => (
                                <tr key={index}>
                                    <td>{fila.tipoIndicador}</td>
                                    <td>{fila.nombre}</td>
                                    <td>{fila.impactoSocial}</td>
                                    <td>{fila.areaImpacto}</td>
                                    <td><a href={fila.enlace}>{fila.responsableParticipacion}</a> empresa responsable</td>
                                    {/* Agrega más celdas según sea necesario */}
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
