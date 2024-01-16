import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  selectedOption,
} from "react-bootstrap";
import Swal from "sweetalert2";
import NAVEGATION from "./navegation";
import axios from "axios";
import "../App.css";
import logo from "../assets/logo_circular.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const CryptoJS = require("crypto-js");
const baseURL = "https://r3colectaback.herokuapp.com/asg/newasg";
//const baseURL = "http://localhost:3500/asg/newasg";
function CreaActivo() {
  //STATES
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState("hidden");
  const [_tipoIndicador, setTipoIndicador] = useState("");
  const [_nombre, setNombre] = useState("");
  const [_impacto, SetImpacto] = useState("");
  const [_beneficiarios, setBeneficiarios] = useState("");
  const [_descripcion, SetDescripcion] = useState("");
  const [_areaimpacto, setAreaImpacto] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  // const [message, setMessage] = useState("");
  // const [message, setMessage] = useState("");
  // const [message, setMessage] = useState("");
  // const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [post, setPost] = React.useState(null);

  //REFERENCIAS
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

  const dropdownRef = useRef(null);
  //FUNCIONES
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

  //funcion para descargar el certificado
  const handleDownloadPDF = () => {
    const content = dropdownRef.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape", // o 'landscape' portrait
        unit: "mm",
        format: "letter",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificado.pdf");
    });
  };

  //funcion para enviar el certificado
  function send() {
    if (
      tipoIndicador.current.value !== "" &&
      nombre.current.value !== "" &&
      inputfile.current.value !== "" &&
      descripcion.current.value !== "" &&
      areaimpacto.current.value !== "" &&
      latitud.current.value !== "" &&
      longitud.current.value !== "" &&
      beneficiarios.current.value !== "" &&
      acciones.current.value !== "" &&
      impacto.current.value !== "" &&
      responsables.current.value !== ""
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
            identificador: hash,
          };

          setMessage(hash);
          console.log(datosJSON);
          axios
            .post(baseURL, datosJSON)
            //.get(baseURL)
            .then((response) => {
              setPost(JSON.stringify(response.data));
              console.log(response.data);
              setTipoIndicador(response.data.tipoIndicador);
              setNombre(response.data.nombre);
              SetImpacto(response.data.impactoSocial);
              setBeneficiarios(response.data.beneficiarios);
              SetDescripcion(response.data.descripcion);
              setAreaImpacto(response.data.areaImpacto);
              setVisible("visible");
              console.log(hash);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error("Error al calcular el hash:", error);
        }
      }

      // Llamada a la función asincrónica
      obtenerHash();
      console.log("send");
    } else {
      setMessage("Datos invalidos");
      Swal.fire({
        title: "Información Invalida",
        text: "No pueden existir datos nulos",
        icon: "warning",
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
              {/* <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card>
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Indicador
                  </Card.Header>
                  <Card.Body>
                    <Dropdown
                      onSelect={handleDropdownSelect}
                      ref={tipoIndicador}
                    >
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedOption || "Selecciona..."}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="opcion1">
                          Opción 1
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="opcion2">
                          Opción 2
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="opcion3">
                          Opción 3
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {selectedOption && (
                      <p>Has seleccionado: {selectedOption}</p>
                    )}
                  </Card.Body>
                </Card>
              </Col> */}
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "120px" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Indicador
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
                    Iniciativa
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la iniciativa"
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
                        placeholder="area impacto"
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
                        placeholder="Latitud"
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
                        placeholder="Longitud"
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
                        placeholder="Beneficiarios"
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
                  <Card.Header as="h5" style={{ color: "#2043b6" }}>
                    Acciones Implementadas
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Acciones Implementadas"
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
                        placeholder="Impacto Social"
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
                        placeholder="Responsables de proyecto"
                        ref={responsables}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: "30px" }}>
                <Button variant="primary" onClick={send}>
                  Generar Certificado
                </Button>{" "}
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
                  ref={dropdownRef}
                  border="primary"
                  style={{
                    width: "auto",
                    height: "auto",
                    visibility: `${visible}`,
                  }}
                >
                  <div className="bodycert">
                    <div className="certificado">
                      <div className="header">CERTIFICADO BLOCKCHAIN ASG</div>
                      <Card.Img
                        variant="top"
                        style={{
                          height: "100px",
                          width: "100px",
                          padding: "10px",
                          textAlign: "center",
                        }}
                        src={logo}
                      />
                      <div className="body">
                        <h2
                          style={{
                            overflowWrap: "break-word",
                            padding: "30px",
                            textAlign: "center",
                            fontSize: "60px",
                          }}
                        >
                          {_tipoIndicador}
                        </h2>
                        <hr></hr>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Nombre :</strong> {_nombre}
                        </h5>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Descripción :</strong> {_descripcion}
                        </h5>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Beneficiarios :</strong> {_beneficiarios}
                        </h5>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Impacto Ambiental :</strong> {_areaimpacto}
                        </h5>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Impacto Social :</strong> {_impacto}
                        </h5>

                        <footer>
                          <p
                            style={{
                              overflowWrap: "break-word",
                              borderTop: "15px",
                              paddingTop: "80px",
                            }}
                          >
                            <strong>Identificador :</strong> {message}
                          </p>
                        </footer>
                      </div>
                    </div>
                  </div>
                </Card>
                <Col
                  xs={12}
                  md={12}
                  s={{ order: 1 }}
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    visibility: `${visible}`,
                  }}
                >
                  <Button variant="primary" onClick={handleDownloadPDF}>
                    Descargar Certificado
                  </Button>{" "}
                </Col>
                {/* <Card className="certificado-card" border="primary">
                  <div className="bodycert">
                    <div className="certificado">
                      <div className="header">CERTIFICADO AMBIENTAL</div>
                      <div className="body">
                        <h1>{_tipoIndicador}</h1>
                        <h2>{_nombre}</h2>
                        <p>Impacto Social: {_impacto}</p>
                        <h5>ID: {message}</h5>
                      </div>
                    </div>
                  </div>
                </Card> */}
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
}
export default CreaActivo;
