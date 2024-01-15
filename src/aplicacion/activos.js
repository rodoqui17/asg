import React, { useEffect, useState } from 'react';
import { Container, Table} from "react-bootstrap";
import { useAuth } from "../auth/auth";
import NAVEGATION from "./navegation";
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';


function Activos() {
        
    // const [user, setUser] = useState(null)
     const auth = useAuth();
    // const navigate = useNavigate();
    // auth.login(user)
    // navigate('/panel')
    return (

        <div>
            <NAVEGATION />
            <Container style={{ padding: "20px" }}>
                <header
                    className="App-title mb-4"
                    style={{
                        width: "100%",
                        position: 'relative',
                        height: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >

    
                    <h2>CERTIFICADOS CREADOS {auth.user}</h2>
                </header>
                <section
                    className="mb-4"
                    style={{
                        width: "100%",
                        position: 'relative',
                        height: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Material</th>
                                <th>Peso</th>
                                <th>Valor</th>
                                <th>Certificado</th>
                    
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>224</td>
                                <td>PET</td>
                                <td>20 Tn</td>
                                <td>800 Bs.</td>
                                <td> <a href="/link">Enlace</a> </td>
                         
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Llantas</td>
                                <td>20 Tn</td>
                                <td>300 Bs.</td>
                                <td> <a href="/link">Enlace</a> </td>
                             
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Llantas</td>
                                <td>20 Tn</td>
                                <td>250 Bs.</td>
                                <td> <a href="/link">Enlace</a> </td>
                            
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Aceite</td>
                                <td>100 Lt</td>
                                <td>300 Bs.</td>
                                <td><a href="/link">Enlace</a> </td>
                               
                            </tr>
                        </tbody>
                    </Table>
                </section>
            </Container>
        </div>

    );

}

export default Activos
