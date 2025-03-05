import React, { useState,useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "../../styles/login.css";

const Login = () => {
    const {store,actions} = useContext(Context)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@correo\.unimet\.edu\.ve$/;
        return regex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !confirmPassword || !name || !lastName || !phone || !username) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!validateEmail(email)) {
            setError("El correo debe ser de dominio @correo.unimet.edu.ve.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            setError("Error al registrar el usuario. Intenta nuevamente.");
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("El correo y la contraseña son obligatorios.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const add = actions.addToken(userCredential.user['accessToken'])
            navigate("/dashboard")
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    const handleGoogleLogin = () => {
        alert("Iniciar sesión con Google (aquí irá la autenticación real)");
    };

    const handleFacebookLogin = () => {
        alert("Iniciar sesión con Facebook (aquí irá la autenticación real)");
    };
    /*Accion de cerrar */
    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="w-100 bg-custom-yellow">
            {/*Bienvenida e imagen */}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center mt-5">
                        <h2 className="text-center text-custom-paragraph"
                            style={{ fontSize: '2rem' }}>¡Bienvenido a esta nueva aventura!</h2>
                        <img className="logo-login"
                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
                            alt="logo avilamet"
                            style={{ height: '400px', width: '400px' }} />
                    </div>
                    {/*Formulario de inicio de sesión */}
                    <div className="col-12 col-md-7 mt-5">
                        <div className="container bg-inputs borde container-width">
                            <nav className="fs-3 d-flex justify-content-center borde p-3"
                                style={{ backgroundColor: '#fef9c3' }}>
                                <div className="nav nav-tabs bg-inputs"
                                    id="nav-tab"
                                    role="tablist">
                                    {/*Edicion de inicio y registro, botton de cerrar*/}
                                    <button
                                        className="nav-link text-custom-green2"
                                        onClick={handleClose}
                                        style={{
                                            letterSpacing: '3px',
                                            fontSize: '1.5rem',
                                            position: 'relative',
                                            padding: '5px 10px',
                                            backgroundColor: 'transparent',
                                            border: '2px solid black',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginRight: '20px',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    > X
                                    </button>
                                    <div className="d-flex">
                                        <button
                                            className={`nav-link ${isLogin ? "active" : ""} border-end text-custom-green2`}
                                            onClick={() => setIsLogin(true)}
                                            style={{
                                                letterSpacing: '3px',
                                                fontSize: '1.5rem',
                                                position: 'relative',
                                                paddingBottom: '10px',
                                                marginRight: '20px',
                                            }}
                                        > INICIAR SESIÓN
                                        </button>
                                        <button
                                            className={`nav-link ${!isLogin ? "active" : ""} border-end text-custom-green2`}
                                            onClick={() => setIsLogin(false)}
                                            style={{
                                                letterSpacing: '3px',
                                                fontSize: '1.5rem',
                                                position: 'relative',
                                                paddingBottom: '10px',
                                                marginRight: '2px',
                                            }}
                                        > REGISTRATE
                                        </button>
                                    </div>
                                </div>
                            </nav>

                            {/*validacion, input, correo y contraseña - inicio de sesión */}
                            <div className="tab-content mt-2" id="nav-tabContent">
                                {isLogin && (
                                    <div className="tab-pane fade show active" id="nav-home">
                                        <form onSubmit={handleLogin} className="d-flex flex-column align-items-center ">
                                            <input
                                                className="form-control form-control-lg inputs-width borde-input text-custom-green2 placeholder-custom"
                                                type="email"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Correo"
                                                aria-label="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input mt-3 text-custom-green2 placeholder-custom"
                                                type="password"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Contraseña"
                                                aria-label="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {error && <p className="text-danger">{error}</p>}

                                            {/*Boton de inicio de sesión */}
                                            <button className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom"
                                                type="submit"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1.5rem',
                                                }}>
                                                Iniciar sesión
                                            </button>

                                            {/*Boton de continuar con google y facebook */}
                                            <div className="container d-flex flex-column align-items-center mb-4 mt-3 text-custom-green "
                                                style={{
                                                    letterSpacing: '1px',
                                                    fontSize: '1rem',
                                                }}>
                                                <h5>--CONTINUAR CON--</h5>
                                                <div className="iconos d-flex justify-content-center">
                                                    <button onClick={handleGoogleLogin}
                                                        className="btn-social"
                                                        style={{ background: 'transparent', border: 'none', marginRight: '10px' }}>
                                                        <img
                                                            className="icono-login"
                                                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431278/pngwing.com_5_xlprpf.png"
                                                            alt="Google login"
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                    </button>
                                                    <button onClick={handleFacebookLogin}
                                                        className="btn-social"
                                                        style={{ background: 'transparent', border: 'none' }}>
                                                        <img
                                                            className="icono-login2"
                                                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431488/pngwing.com_6_jgwllf.png"
                                                            alt="Facebook login"
                                                            tyle={{ width: '50px', height: '50px' }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/*validacion, input, correo y contraseña - registro */}
                                {!isLogin && (
                                    <div className="tab-pane fade show active"
                                        id="nav-profile">
                                        <form onSubmit={handleRegister}
                                            className="d-flex flex-column align-items-center">
                                            <input
                                                className="form-control form-control-lg mb-2 inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="text"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Nombre"
                                                aria-label="Nombre"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="text"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Apellido"
                                                aria-label="Apellido"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="email"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Correo"
                                                aria-label="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="tel"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Teléfono"
                                                aria-label="Teléfono"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="text"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Nombre de usuario"
                                                aria-label="Nombre de usuario"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="password"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Contraseña"
                                                aria-label="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input text-custom-green3 placeholder-custom"
                                                type="password"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1rem',
                                                }}
                                                placeholder="Confirma contraseña"
                                                aria-label="Confirma contraseña"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            {error && <p className="text-danger">{error}</p>}
                                            <button className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom"
                                                type="submit"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1.5rem',
                                                }}>
                                                Crear cuenta
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="my-5"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;