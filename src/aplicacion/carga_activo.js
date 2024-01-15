import React, { useRef, useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import NAVEGATION from "./navegation";
import axios from "axios";
const CryptoJS = require("crypto-js");
const baseURL = "https://r3colectaback.herokuapp.com/asg/newasg";
function CreaActivo() {
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const lote = useRef(null);
  const cantidad = useRef(null);
  const peso = useRef(null);
  const tipo_material = useRef(null);
  const color = useRef(null);
  const actividad = useRef(null);
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
      lote.current.value !== "" &&
      cantidad.current.value !== "" &&
      inputfile.current.value !== ""
    ) {
      calculateSHA256(inputfile.current.files[0]).then((hash) => {
       
        Swal.fire({
          title: "REGISTRO GENERADO",
          text: hash,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        return hash;
        setMessage(hash);
      });
      //actualizar los campos de referencia en base a los siguientes campos
      const datosJSON = {
        tipoIndicador: lote.current.value,
        nombre: cantidad.current.value,
        descripcion: peso.current.value,
        areaImpacto: tipo_material.current.value,
        latitud: color.current.value,
        longitud: actividad.current.value,
        beneficiarios: color.current.value,
        accionesImplementadas: acciones.current.value,
        impactoSocial: impacto.current.value,
        responsableParticipacion: responsables.current.value,
      };
      axios
        .post(baseURL,datosJSON)
        //.get(baseURL)
        .then((response) => {
          setPost(JSON.stringify(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("send");
      lote.current.value = "";
      cantidad.current.value = "";
      peso.current.value = "";
      tipo_material.current.value = "";
      color.current.value = "";
      actividad.current.value = "";
      inputfile.current.value = "";
    } else {
      // setMessage("Datos invalidos")
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
                        ref={lote}
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
                        ref={cantidad}
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
                        ref={peso}
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
                        ref={tipo_material}
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
                        ref={color}
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
                <Card
                  border="primary"
                  style={{ width: "auto", height: "auto" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    CERTIFICADO GENERADO
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{ color: "#2043b6" }}>{post}</Card.Text>
                  </Card.Body>
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
