import React, { useRef, useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import NAVEGATION from "./navegation";
import axios from "axios";
import "../App.css"
const CryptoJS = require("crypto-js");
const baseURL = "https://r3colectaback.herokuapp.com/asg/asg";
function CreaActivo() {
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const tipoIndicador = useRef(null);
  const nombre = useRef(null);
  const descripcion = useRef(null);
  const areaimpacto = useRef(null);
  const latitud = useRef(null);
  const longitud = useRef(null);
  const beneficiarios = useRef(null);
  const inputfile = useRef(null);
  const acciones = useRef(null);
  const impacto = useRef(null);
  const responsables = useRef(null);

  function calculateSHA256(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        const wordArray = CryptoJS.lib.WordArray.create(reader.result);
        const hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
        resolve(hash);
        setMessage(hash);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  // Ejemplo de uso



  function send() {
    if (
      tipoIndicador.current.value !== "" &&
      nombre.current.value !== "" &&
      inputfile.current.value !== ""
    ) {

      async function obtenerHash() {
        try {
          const hash = await calculateSHA256(inputfile.current.files[0]);

          Swal.fire({
            title: "REGISTRO GENERADO",
            text: hash,
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          // setMessage(hash);

          // Ahora hash contiene el valor resuelto de la promesa
          console.log(hash);

          // Enviamos el POST para el registro
          const datosJSON = {
            tipoIndicador: tipoIndicador.current.value,
            nombre: nombre.current.value,
            descripcion: descripcion.current.value,
            areaImpacto: areaimpacto.current.value,
            latitud: latitud.current.value,
            longitud: longitud.current.value,
            beneficiarios: beneficiarios.current.value,
            accionesImplementadas: acciones.current.value,
            impactoSocial: impacto.current.value,
            responsableParticipacion: responsables.current.value,
          };

          setMessage({message:JSON.stringify(datosJSON),hashresult:hash})

          axios
            //.post(baseURL,datosJSON)
            .get(baseURL)
            .then((response) => {
              setPost(JSON.stringify(response.data.message));
              console.log(response.data);
              console.log(hash);
            })
            .catch((error) => {
              console.log(error);
            });

        } catch (error) {
          console.error('Error al calcular el hash:', error);
        }
      }

      // Llamada a la función asincrónica
      obtenerHash();
      console.log("send");
    } else {
      setMessage("Datos invalidos")
      Swal.fire({
        title: "Información Invalida",
        text: "No pueden existir datos nulos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
  return (
    <div>
      <NAVEGATION />

      <Container style={{ padding: "20px" }}>
        <header
          className="App-title mb-4"
          style={{
            width: "100%",
            position: "relative",
            height: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>NUEVO REGISTRO</h2>
        </header>
        <section>
          <Container>
            <Row>
              <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: "30px" }}>
                {" "}
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Certificado
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Search"
                        ref={inputfile}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Tipo Iniciativa
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={tipoIndicador}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Nombre
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={nombre}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Descripción
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="descripción"
                        ref={descripcion}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Area Impacto
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={areaimpacto}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Latitud
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={latitud}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Longitud
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={longitud}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Beneficiarios
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={beneficiarios}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h6" style={{ color: "#2043b6" }}>
                    Acciones Implementadas
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={acciones}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Impacto Social
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={impacto}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Responsables
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el valor del certificado"
                        ref={responsables}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: "30px" }}>
                {" "}
                {/* <Card
                  border="primary"
                  style={{ width: "auto", height: "auto" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    CERTIFICADO GENERADO
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{ color: "#2043b6" }}>{message}</Card.Text>
                  </Card.Body>
                </Card> */}
                <Card
                  border="primary"
                  style={{ width: "auto", height: "auto" }}
                >
                  <div className="bodycert">
                    <div className="certificado">
                      <div className="header">CERTIFICADO GENERADO</div>
                      <div className="body">
                        <div className="message">{message}
                        <th>{message.tipoIndicador}</th>
                        <th>{message.nombre}</th>
                        <th>{message.areaImpacto}</th>
                        <th>{message.latitud}</th>
                        <th>{message.longitud}</th>
                        <th>{message.beneficiarios}</th>
                        <th>{message.acciones}</th>
                        <th>{message.impacto}</th>
                        <th>{message.responsables}</th>
                        <th>{message.hashresult}</th>
                        

                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Button variant="primary" onClick={send}>
                Generar Certificado
              </Button>{" "}
            </Row>
          </Container>


        </section>
      </Container>
    </div>
  );
}
export default CreaActivo;
