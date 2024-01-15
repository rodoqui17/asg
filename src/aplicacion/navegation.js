import React from "react";
import logo from '../shared/logo192.png';
// import { useAuth } from "../auth/auth";
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import { FaCloudsmith, FaSistrix,FaFingerprint, FaFolderPlus,FaTachometerAlt,FaDumpster } from "react-icons/fa";
function Navegation() {

    // const auth = useAuth();
    
    return (



        <Container>
            <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="#">
                        <Card.Header className="mb-4">
                            
                            <img src={logo} className="logo" alt="logo" style={{ width: "100%" }} />
                      
                        </Card.Header>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/panel">Operaciones <FaCloudsmith />   </Nav.Link>
                            //<Nav.Link href="/activos">Mis Certificados <FaTachometerAlt/></Nav.Link>
                            <Nav.Link href="#consultas">Consultas <FaSistrix /> </Nav.Link>
                            <Nav.Link href="/validar">Validar Certificado <FaFingerprint/></Nav.Link>
                            <Nav.Link href="/nuevoactivo"> Nuevo Certificado <FaFolderPlus/></Nav.Link>
                            //<Nav.Link href="#marketplace">Ofertas <FaDumpster/></Nav.Link>
                           
                        </Nav>
                         <Navbar.Text>
                          <a href="/">Cerrar </a> 
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
        
    );



}
export default Navegation;
