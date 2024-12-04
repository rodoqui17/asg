import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import NAVEGATION from "./navegation";
import axios from "axios";
import "../App.css";
import logo from "../assets/logo_circular.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { create } from "ipfs-http-client";
import { PinataSDK } from "pinata-web3";
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZTIyNzVhYi1jNWIwLTQwYjktOTA4OS0wYTcwZGVmMjI2NGIiLCJlbWFpbCI6InF1aXJvei5yb2RyaWdvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwZjc0NTAxZTZjYzY2MTRkN2I4YiIsInNjb3BlZEtleVNlY3JldCI6ImQzZGE5NDgxYWQ1NTdjZTI5Zjg1ZGNjMGY0ZDRlZTAwYTFiYzI4YjllODU1M2JjNTZmOGJmNTY2YzRlNzZiZDYiLCJleHAiOjE3NjQ4MTMyMTl9.62AN1FB_gUVFc3jyOZC6ZIxGTZi83vJMdFEhpCZx_S0",
  pinataGateway: "indigo-apparent-armadillo-868.mypinata.cloud",
});

const ipfs = create({ url: "http://127.0.0.1:8080" }); // Cambia la URL si usas otro nodo

const CryptoJS = require("crypto-js");
const baseURL = "https://backend-one-tawny-80.vercel.app/asg/newasg";
//const baseURL = "http://localhost:3500/asg/newasg";
function CreaActivo() {
  //STATES
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState("hidden");
  const [_tipoIndicador, setTipoIndicador] = useState("");
  const [_nombre, setNombre] = useState("");
  const [_impacto, SetImpacto] = useState("");
  // const [_beneficiarios, setBeneficiarios] = useState("");
  const [_descripcion, SetDescripcion] = useState("");
  const [_areaimpacto, setAreaImpacto] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [iniciativas, setIniciativas] = useState([]);
  const [accion, setAcciones] = useState([]);
  const [nuevoBeneficiario, setnuevoBeneficario] = useState("");
  const [nuevaAccion, setnuevaAccion] = useState("");
  const [file, setFile] = useState("");
  const [ipfsfile, setipfsfile] = useState("");



  const handleNombreChange = (e) => {
    setnuevoBeneficario(e.target.value);
  };

  const handleAgregarBeneficiario = () => {
    if (nuevoBeneficiario.trim() !== "") {
      setIniciativas([...iniciativas, nuevoBeneficiario]);
      setnuevoBeneficario("");
    }
  };

  const handleaccionChange = (e) => {
    setnuevaAccion(e.target.value);
  };
  const handleAgregarAcciones = () => {
    if (nuevaAccion.trim() !== "") {
      setAcciones([...accion, nuevaAccion]);
      setnuevaAccion("");
    }
  };
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

  // Manejar cambios en la selección
  const handleSelectChange = (event) => {
    setSelectedIndicator(event.target.value);
  };

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
        format: "A4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificado.pdf");
    });
  };

  //funcion para enviar el certificado
  function send() {


    const latitudeRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
    const longitudeRegex = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    const fileNameRegex = /^[^\\]*[\\]?([^\\]+)$/;  // Expresión regular para extraer el nombre del archivo desde la ruta

    // Usa la expresión regular para extraer el nombre del archivo desde la ruta
    const inputFilePath = inputfile.current.value;
    console.log(inputFilePath);

    // Extraer el nombre del archivo desde la ruta, teniendo en cuenta "fakepath"
    const fileNameMatch = /([^\\]+)$/.exec(inputFilePath);
    const fileName = fileNameMatch ? fileNameMatch[1] : "";
    console.log(fileName);
    if (
      selectedIndicator !== "" &&
      nombre.current.value !== "" &&
      inputfile.current.value !== "" &&
      descripcion.current.value !== "" &&
      areaimpacto.current.value !== "" &&
      latitud.current.value !== "" &&
      latitudeRegex.test(latitud.current.value) &&  // Validate latitude format
      longitud.current.value !== "" &&
      longitudeRegex.test(longitud.current.value) &&  // Validate longitude format
      iniciativas.length !== 0 &&
      acciones.length !== "" &&
      impacto.current.value !== "" &&
      responsables.current.value !== ""
    ) {
      async function obtenerHash() {
        try {
          if (!inputfile.current.files || !inputfile.current.files[0]) {
            Swal.fire({
              title: "Error",
              text: "No se ha seleccionado un archivo.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          }

          // Obtener archivo seleccionado y calcular hash
          const file = inputfile.current.files[0];
          const hash = await calculateSHA256(file);

          // Verificar si el hash ya existe
          const url = `https://backend-one-tawny-80.vercel.app/asg/asgid/${hash}`;
          console.log(`URL generada: ${url}`);
          try {
            const response = await axios.get(url);
            if (response.data.identificador === hash) {
              Swal.fire({
                title: "DOCUMENTO YA REGISTRADO",
                text: hash,
                icon: "error",
                confirmButtonText: "Aceptar",
              });
              return;
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("Hash no encontrado. Procediendo a registrar...");
            } else {
              console.error("Error al realizar la solicitud:", error);
              Swal.fire({
                title: "Error",
                text: "Ocurrió un problema al verificar el documento.",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
              return;
            }
          }

          // Subir archivo comprimido a IPFS
          let ipfsHash = "";
          try {
            // const fileBuffer = await file.arrayBuffer(); // Convertir archivo a buffer
            // const compressed = await compressFile(fileBuffer); // Comprimir archivo (función explicada más abajo)
            const upload = await pinata.upload.file(file); // Subir a IPFS
            console.log(upload.IpfsHash);

            ipfsHash = upload.IpfsHash; // Obtener CID en formato string
            console.log("Archivo subido a IPFS con hash:", ipfsHash);
            setipfsfile(ipfsHash);
          } catch (ipfsError) {
            console.error("Error al subir archivo a IPFS:", ipfsError);
            Swal.fire({
              title: "Error",
              text: "No se pudo subir el archivo a IPFS.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          }

          // Datos para el registro en el backend
          const datosJSON = {
            tipoIndicador: selectedIndicator,
            nombre: nombre.current.value,
            descripcion: descripcion.current.value,
            areaImpacto: areaimpacto.current.value,
            latitud: latitud.current.value,
            longitud: longitud.current.value,
            beneficiarios: iniciativas,
            accionesImplementadas: accion,
            impactoSocial: impacto.current.value,
            responsableParticipacion: responsables.current.value,
            identificador: hash,
            file: fileName,
            ipfsHash: ipfsHash, // Hash del archivo en IPFS
          };

          console.log("Datos para registrar:", datosJSON);

          // Registrar el hash y el archivo en el backend
          try {
            const postResponse = await axios.post(baseURL, datosJSON);
            console.log("Registro exitoso:", postResponse.data);

            Swal.fire({
              title: "REGISTRO GENERADO",
              text: `Hash registrado: ${hash}`,
              icon: "success",
              confirmButtonText: "Aceptar",
            });

            // Actualizar estado o realizar acciones adicionales
            setPost(JSON.stringify(postResponse.data));
            setTipoIndicador(postResponse.data.tipoIndicador);
            setNombre(postResponse.data.nombre);
            SetImpacto(postResponse.data.impactoSocial);
            setnuevoBeneficario(postResponse.data.beneficiarios);
            SetDescripcion(postResponse.data.descripcion);
            setAreaImpacto(postResponse.data.areaImpacto);
            setFile(fileName);
            setVisible("visible");
          } catch (postError) {
            console.error("Error al registrar el hash:", postError);
            Swal.fire({
              title: "Error",
              text: "No se pudo registrar el documento.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        } catch (error) {
          console.error("Error general:", error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }



      // Llamada a la función asincrónica
      obtenerHash();
      console.log("send");
    } else {
      setMessage("Datos invalidos");
      Swal.fire({
        title: "Información Invalida",
        text: "Existen datos erroneos en el formulario",
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
                    Certificado Gobernación
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
              <Col xs={12} md={12} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card>
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Selecciona un indicador
                  </Card.Header>
                  <Card.Body>
                    <Dropdown>
                      <select
                        id="indicators"
                        value={selectedIndicator}
                        onChange={handleSelectChange}
                      >
                        <option value="">Indicadores</option>
                        <option value="Cantidad de residuos reciclados">
                          Cantidad de residuos reciclados
                        </option>
                        <option value="Desarrollo de Hábitats Naturales">
                          Desarrollo de Hábitats Naturales
                        </option>
                        <option value="Participación en Iniciativas de RSC">
                          Participación en Iniciativas de RSC
                        </option>
                        <option value="Certificación de Origen">
                          Certificación de Origen
                        </option>
                      </select>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
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
              </Col> */}
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
                    Area de Impacto
                  </Card.Header>
                  <Card.Body>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Indique el area de impacto de la iniciativa"
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
                  style={{ width: "auto", height: "auto" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Beneficiarios
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="nombreIniciativa">
                        <Form.Control
                          type="text"
                          placeholder="Grupos beneficidos con la actividad"
                          value={nuevoBeneficiario}
                          onChange={handleNombreChange}
                        />
                        <Button
                          variant="primary"
                          onClick={handleAgregarBeneficiario}
                          style={{
                            marginLeft: "10px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "auto",
                            width: "190px",
                            backgroundColor: "#2043b6",
                            textAlign: "center",
                          }}
                        >
                          Agregar
                          {/* <FontAwesomeIcon icon={faPlus} /> */}
                        </Button>
                        <div>
                          <ul>
                            {iniciativas.map((iniciativa, index) => (
                              <li key={index}>{iniciativa}</li>
                            ))}
                          </ul>
                        </div>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
                <Card
                  border="primary"
                  style={{ width: "auto", height: "auto" }}
                >
                  <Card.Header as="h3" style={{ color: "#2043b6" }}>
                    Acciones Implementadas
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="AccionesImplementadas">
                        <Form.Control
                          type="text"
                          placeholder="Acciones implementadas en la iniciativa"
                          value={nuevaAccion}
                          onChange={handleaccionChange}
                        />
                        <Button
                          variant="primary"
                          onClick={handleAgregarAcciones}
                          style={{
                            marginLeft: "10px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            height: "auto",
                            width: "190px",
                            backgroundColor: "#2043b6",
                            textAlign: "center",
                          }}
                        >
                          Agregar
                          {/* <FontAwesomeIcon icon={faPlus} /> */}
                        </Button>
                        <div>
                          <ul>
                            {accion.map((accion, index) => (
                              <li key={index}>{accion}</li>
                            ))}
                          </ul>
                        </div>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col xs={12} md={4} s={{ order: 1 }} style={{ padding: "10px" }}>
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
              </Col> */}
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
                          <strong>Iniciativa :</strong> {_nombre}
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
                          <strong>Beneficiarios :</strong>
                          <div>
                            <ul>
                              {iniciativas.map((iniciativa, index) => (
                                <li key={index}>{iniciativa}</li>
                              ))}
                            </ul>
                          </div>
                        </h5>
                        <h5
                          style={{
                            overflowWrap: "break-word",
                            paddingTop: "20px",
                          }}
                        >
                          <strong>Area de Impacto :</strong> {_areaimpacto}
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
                              paddingTop: "50px",
                            }}
                          >
                            <strong>Identificador :</strong> {message}
                          </p>

                          <p
                            style={{
                              overflowWrap: "break-word",
                              borderTop: "5px",
                              paddingTop: "10px",
                            }}
                          >
                            <strong>Reporte :</strong> {file}
                          </p>
                          <p
                            style={{
                              overflowWrap: "break-word",
                              borderTop: "5px",
                              paddingTop: "10px",
                            }}
                          >
                            <strong>IPFS HASH :</strong> {ipfsfile}
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
