import React from "react";
import { Container, Table, Card, Row, Col } from 'react-bootstrap';
// import { useAuth } from "../auth/auth";
// import { useNavigate } from "react-router-dom";
import NAVEGATION from "./navegation";

function Panel() {

//    const auth = useAuth()
//    const navigate = useNavigate()
     // console.log(auth); 
  

   return (
        <div>
            <NAVEGATION />
            <Container style={{ padding: "20px" }}>
                <header className="App-title mb-4"
                    style={{
                        width: "100%",
                        position: 'relative',
                        // height: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <h2>OPERACIONES </h2>
                </header>
                <section>
                    <Container>
                        <Row>
                            <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: '20px' }}> <Card border="primary" style={{ width: 'auto', height: '190px' }}>
                                <Card.Header as="h3" style={{ color: '#2043b6' }}>ACTIVOS</Card.Header>
                                <Card.Body>
                                    <Card.Title as="h1" style={{ color: '#2043b6' }}> 10 </Card.Title>
                                    <Card.Text style={{ color: '#2043b6' }}>
                                        Activos creados
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                            </Col>
                            <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: '20px' }}> <Card border="primary" style={{ width: 'auto', height: '190px' }}>
                                <Card.Header as="h3" style={{ color: '#2043b6' }}>TRANSACCIÓNES</Card.Header>
                                <Card.Body>
                                    <Card.Title as="h1" style={{ color: '#2043b6' }}> 80 </Card.Title>
                                    <Card.Text style={{ color: '#2043b6' }}>
                                        Transferencias Realizadas
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: '20px' }}> <Card border="primary" style={{ width: 'auto', height: '190px' }}>
                                <Card.Header as="h3" style={{ color: '#2043b6' }}>IMPACTO AMBIENTAL</Card.Header>
                                <Card.Body>
                                    <Card.Title as="h1" style={{ color: '#2043b6' }}> 110 </Card.Title>
                                    <Card.Text style={{ color: '#2043b6' }}>
                                        Toneladas Recuperadas
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>

                        </Row>
                    </Container>
                </section>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#TxId</th>
                            <th>origen</th>
                            <th>Destino</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>ECOPLASCTIC</td>
                            <td>EMBOL</td>
                            <td>20 tn</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>ECOPLASCTIC</td>
                            <td>OXOM</td>
                            <td>30 tn</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>ECOPLASCTIC</td>
                            <td>OXOM</td>
                            <td>30 tn</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>ECOPLASCTIC</td>
                            <td>EMBOL</td>
                            <td>30 tn</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );

}

export default Panel