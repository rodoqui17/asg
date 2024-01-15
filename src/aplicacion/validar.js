import React, { useRef, useState } from 'react';
import { Col, Row, Card, Container, Button } from "react-bootstrap";
// import { FaDumpster } from "react-icons/fa";
import sha256 from 'crypto-js/sha256';
//import hmacSHA512 from 'crypto-js/hmac-sha512';
//import Base64 from 'crypto-js/enc-base64';
import NAVEGATION from "./navegation";
import '../App.css'
import Swal from 'sweetalert2'
//import CHECKSUM from '../shared/checksum';
//import RNFS from "react-native-fs";
const CryptoJS = require("crypto-js");
function Validar() {
    const [checksumvalue, setChecksumValue] = useState(['data']);
    //const [data, setData] = useState([]);

    const [message, setMessage] = useState('RESULTADO');
    const inputfile = useRef(null);
    const inputext = useRef(null);
    // const numbers = [1, 2, 3, 4, 5];
    // console.log(data);
    // const listItems = data.map((number) =>
    //     <li key={number}>{number}</li>
    // );

    function calculateSHA256(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function () {
                const wordArray = CryptoJS.lib.WordArray.create(reader.result);
                const hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
                resolve(hash);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const showFile = (e) => {

        calculateSHA256(inputfile.current.files[0])
            .then((hash) => {
                console.log(hash);
                if (inputext.current.value === hash) {

                    setMessage("CERTIFICADO VALIDADO")
                    // setChecksumValue(text);
                    Swal.fire({
                        title: 'Certificado Valido',
                        text: 'El Certificado ha sido generado por R3COLECA',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                    inputext.current.value = ''
                    inputfile.current.value = ''
                    console.log("Valido");
                } else {
                    setMessage("CERTIFICADO NO VALIDADO")
                    setChecksumValue("{data: no avalible}")
                    Swal.fire({
                        title: 'Certificado Invalido',
                        text: 'El Certificado no coincide con el Identificador',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })

                }
                return hash;
            })
            .catch((error) => {
                console.error(error);
            });

        setChecksumValue('');
        // console.log(hashSumCalc);
        console.log(inputfile.current.value);
        console.log(inputext.current.value);
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            var hash = sha256(text).toString();
            // console.log(text);
            setChecksumValue(text);



        };
        reader.readAsText(e.target.files[0]);
    };

    // cheksum(file)
    function limpiar() {
        setChecksumValue('');
        window.location.reload();

    }




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
                    <h2>VALIDAR CERTIFICADO</h2>
                </header>
            </Container>
            <Container>
                <section
                    className="mb-4"
                    style={{
                        width: "100%",
                        position: 'relative',
                        height: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>


                        <Container style={{ paddingBottom: '30px' }}>
                            <Row>
                                <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: '30px' }}> <Card border="primary" style={{ width: 'auto', height: '120px' }}>
                                    <Card.Header as="h3" style={{ color: '#2043b6' }}>Identificador</Card.Header>
                                    <Card.Body>
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Ingrese el identificador del certificado" ref={inputext} />
                                        </div>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: '30px' }}> <Card border="primary" style={{ width: 'auto', height: '120px' }}>
                                    <Card.Header as="h3" style={{ color: '#2043b6' }}>Certificado</Card.Header>
                                    <Card.Body>
                                        <div className="input-group">
                                            <input type="file" className="form-control" placeholder="Search" ref={inputfile} onChange={showFile} />
                                        </div>
                                    </Card.Body>
                                </Card>
                                </Col>

                                <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: '30px' }}> <Card border="primary" style={{ width: 'auto', height: 'auto' }}>
                                    <Card.Header as="h3" style={{ color: '#2043b6' }}>{message}</Card.Header>
                                    <Card.Body>

                                        <Card.Text style={{ color: '#2043b6' }}>
                                            {checksumvalue}

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col xs={12} md={12} s={{ order: 1 }} style={{ paddingLeft: '30px' }}>
                                    <Button variant="primary" onClick={limpiar} >Nueva Consulta</Button>{' '}
                                </Col>
                            </Row>
                        </Container>

                        {/* <CHECKSUM parentToChild={checksumvalue}/>   */}
                        {/* {message} */}

                    </div>





                </section>
            </Container>

        </div>
    );
}

export default Validar