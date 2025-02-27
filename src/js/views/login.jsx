import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
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
            console.log("Usuario registrado:", userCredential.user);
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
            console.log("Usuario logueado:", userCredential.user);
            navigate("/dashboard");
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

    return (
        <div className="w-100 bg-custom-yellow">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center mt-5">
                        <h2 className="text-center">Bienvenido a esta nueva aventura!</h2>
                        <img
                            className="logo-login"
                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
                            alt="logo avilamet"
                        />
                    </div>
                    <div className="col-12 col-md-7 mt-5">
                        <div className="container bg-inputs borde container-width">
                            <nav className="fs-3 d-flex justify-content-center borde p-3">
                                <div className="nav nav-tabs bg-inputs" id="nav-tab" role="tablist">
                                    <button
                                        className={`nav-link ${isLogin ? "active" : ""} border-end`}
                                        onClick={() => setIsLogin(true)}
                                    >
                                        Iniciar sesión
                                    </button>
                                    <button
                                        className={`nav-link ${!isLogin ? "active" : ""}`}
                                        onClick={() => setIsLogin(false)}
                                    >
                                        Registrarme
                                    </button>
                                </div>
                            </nav>

                            <div className="tab-content mt-2" id="nav-tabContent">
                                {isLogin && (
                                    <div className="tab-pane fade show active" id="nav-home">
                                        <form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input"
                                                type="email"
                                                placeholder="Correo"
                                                aria-label="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input mt-3"
                                                type="password"
                                                placeholder="Contraseña"
                                                aria-label="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {error && <p className="text-danger">{error}</p>}
                                            <button className="btn text-white bg-custom-green button-width mt-3" type="submit">
                                                Iniciar sesión
                                            </button>

                                            <div className="container d-flex flex-column align-items-center mb-4 mt-3">
                                                <h5>--CONTINUAR CON--</h5>
                                                <div className="iconos d-flex justify-content-center">
                                                    <button onClick={handleGoogleLogin} className="btn-social">
                                                        <img
                                                            className="icono-login"
                                                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431278/pngwing.com_5_xlprpf.png"
                                                            alt="Google login"
                                                        />
                                                    </button>
                                                    <button onClick={handleFacebookLogin} className="btn-social">
                                                        <img
                                                            className="icono-login"
                                                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431488/pngwing.com_6_jgwllf.png"
                                                            alt="Facebook login"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {!isLogin && (
                                    <div className="tab-pane fade show active" id="nav-profile">
                                        <form onSubmit={handleRegister} className="d-flex flex-column align-items-center">
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="text"
                                                placeholder="Nombre"
                                                aria-label="Nombre"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="text"
                                                placeholder="Apellido"
                                                aria-label="Apellido"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="email"
                                                placeholder="Correo"
                                                aria-label="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="tel"
                                                placeholder="Teléfono"
                                                aria-label="Teléfono"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="text"
                                                placeholder="Nombre de usuario"
                                                aria-label="Nombre de usuario"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input"
                                                type="password"
                                                placeholder="Contraseña"
                                                aria-label="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input"
                                                type="password"
                                                placeholder="Confirma contraseña"
                                                aria-label="Confirma contraseña"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            {error && <p className="text-danger">{error}</p>}
                                            <button className="btn text-white bg-custom-green button-width mb-4 mt-3" type="submit">
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