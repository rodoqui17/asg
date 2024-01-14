
import logo from '../shared/logo512.png';
import { Form, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useAuth } from '../auth/auth';
import { GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
  
function Login() {

    const user = useRef(null);
    const pass = useRef(null);
    const auth = useAuth()
    const navigate = useNavigate()
    const [profile, setProfile] = useState([]);
    const clientId = '143728972842-278neti9co35g9dov2o6ujhu9s928rt0.apps.googleusercontent.com';



    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
       

    });


    const onSuccess = (res) =>{
        setProfile(res.profileObj);
      console.log(profile);
            Swal.fire({
                title:  "<img src='" + res.profileObj.imageUrl + "' style='width:150px;  border-radius: 100%;'>",
                text:'Bienvenido ' + res.profileObj.name,
                // icon: 'success',
                confirmButtonText: 'Ingresar'
            }).then(function () {
                window.location = "/panel";
            });
      
    };
    const onFailure = (err) => {
        console.log('failed', err);
    };
    
    // const logout = (res) => {
    //     console.log(res);
    //         window.location = "/";
        
    // };

    function resultado(user, pass) {
        auth.login(user)
         navigate('/panel')
        console.log(user.current.value);
        console.log(pass.current.value);
        user.current.placeholder = "";
        pass.current.placeholder = "";
        
        // Swal.fire({
        //     title: 'Bien venido',
        //     text: 'Continuar con el registro',
        //     icon: 'success',
        //     confirmButtonText: 'Aceptar'
        // })
    }
    return (
        <div className="App">
            <header className="App-header">
                <Form >


                    <Card border="success" style={{ width: "40rem", alignItems: 'center', padding: "20px", boxShadow: " 10px 10px 2px 3px #888888" }}>
                        <Card.Header className="mb-4">
                            <img src={logo} className="logo" alt="logo" style={{ width: "100%" }} />
                        </Card.Header>
                        <Card.Title className="mb-4" style={{ width: "40rem", alignItems: 'center', color: "black" }} >LOGIN</Card.Title>
                        <Form.Group className="mb-3" controlId="formBasicUser">

                            <Form.Control
                                name="user"
                                ref={user}
                                placeholder="Usuario" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                ref={pass}
                                placeholder="Contraseña" />
                        </Form.Group>

                        <Button className="mb-3" variant="success" size="lg" style={{
                            width: "10rem",
                            position: 'relative',
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onClick={() => resultado(user, pass)}>
                            Ingresar
                        </Button>{' '}
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                        {/* <GoogleLogout
                            clientId={clientId}
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                        >
                        </GoogleLogout> */}
                    </Card>
                </Form>

                <Form.Text size="sm" style={{ width: "40rem", alignItems: 'center', padding: "20px", color: "white" }} >
                    <p> Aun no tienes una cuenta  <a href="/panel">Registrate </a></p>
                </Form.Text>
            </header>
        </div>
    )
}

export default Login;