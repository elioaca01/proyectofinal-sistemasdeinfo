import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth, db } from "../firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../../styles/login.css";

const Login = () => {
    const { actions } = useContext(Context);
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

    const handleClose = () => {
        navigate("/");
    };

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@correo\.unimet\.edu\.ve$/.test(email);

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
            const user = userCredential.user;

            if (!user.uid) {
                throw new Error("No se obtuvo el UID del usuario.");
            }

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                lastName: lastName,
                email: email,
                phone: phone,
                username: username,
                role: "Excursionista"
            });

            actions.setUser(user);
            navigate("/");
        } catch (error) {
            console.error("🚨 Error detectado:", error.code, error.message);
            setError(`Error: ${error.message}`);
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
            console.log("🔥 Intentando iniciar sesión con:", email);

            // Iniciar sesión con Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("✅ Usuario autenticado:", user.uid);

            // Obtener la información del usuario en Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log("📌 Datos del usuario en Firestore:", userData);

                // Guardar usuario y rol en el contexto global
                actions.setUser({
                    uid: user.uid,
                    email: user.email,
                    role: userData.role,
                    name: userData.name,
                    lastName: userData.lastName
                });

                console.log("✅ Usuario guardado en contexto con rol:", userData.role);

                // Redirigir según el rol
                if (userData.role === "Admin") {
                    console.log("🚀 Redirigiendo a Admin Dashboard...");
                    navigate("/admin-dashboard");
                } else {
                    console.log("🏠 Redirigiendo a Home...");
                    navigate("/");
                }
            } else {
                console.error("🚨 No se encontró el usuario en Firestore.");
                setError("Error: No se encontraron los datos del usuario.");
            }
        } catch (error) {
            console.error("🚨 Error al iniciar sesión:", error.code, error.message);

            if (error.code === "auth/user-not-found") {
                setError("Usuario no encontrado. Verifica tus credenciales.");
            } else if (error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta. Intenta nuevamente.");
            } else {
                setError("Error al iniciar sesión. Intenta más tarde.");
            }
        }
    };


    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("✅ Usuario autenticado con Google:", user);

            // Referencia al documento del usuario en Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                // Si el usuario no existe en Firestore, lo creamos con rol "Excursionista"
                console.log("🆕 Creando nuevo usuario en Firestore...");
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName || "",
                    email: user.email,
                    phone: user.phoneNumber || "",
                    username: user.displayName ? user.displayName.replace(/\s+/g, "").toLowerCase() : "",
                    role: "Excursionista" // 🔥 Rol por defecto
                });
                console.log("✅ Usuario guardado en Firestore con rol Excursionista.");
            } else {
                console.log("📌 Usuario ya registrado en Firestore.");
            }

            // Obtener los datos actualizados del usuario y guardarlos en el contexto
            const updatedUserDoc = await getDoc(userDocRef);
            const userData = updatedUserDoc.data();

            actions.setUser(userData);

            // Redirigir según el rol del usuario
            if (userData.role === "Admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("🚨 Error con Google:", error.message);
            setError("Error al iniciar sesión con Google.");
        }
    };


    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            actions.setUser(result.user); // Establecer el usuario en el contexto
            navigate("/");  // Ir al Home después de iniciar sesión con Facebook
        } catch (error) {
            console.error("Error con Facebook:", error.message);
            setError("Error al iniciar sesión con Facebook.");
        }
    };

    return (
        <div className="w-100 bg-custom-yellow">
            {/* Bienvenida e imagen */}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center mt-5">
                        <h2 className="text-center text-custom-paragraph" style={{ fontSize: '2rem' }}>
                            ¡Bienvenido a esta nueva aventura!
                        </h2>
                        <img
                            className="logo-login"
                            src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
                            alt="logo avilamet"
                            style={{ height: '400px', width: '400px' }}
                        />
                    </div>
                    {/* Formulario de inicio de sesión */}
                    <div className="col-12 col-md-7 mt-5">
                        <div className="container bg-inputs borde container-width">
                            <nav className="fs-3 d-flex justify-content-center borde p-3" style={{ backgroundColor: '#fef9c3' }}>
                                <div className="nav nav-tabs bg-inputs" id="nav-tab" role="tablist">
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
                                            width: '50px',
                                            height: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        X
                                    </button>
                                    <div className="d-flex">
                                        <button
                                            className={`nav-link ${isLogin ? "active" : ""} border-end text-custom-green2`}
                                            onClick={() => setIsLogin(true)}
                                        >
                                            INICIAR SESIÓN
                                        </button>
                                        <button
                                            className={`nav-link ${!isLogin ? "active" : ""} border-end text-custom-green2`}
                                            onClick={() => setIsLogin(false)}
                                        >
                                            REGISTRATE
                                        </button>
                                    </div>
                                </div>
                            </nav>

                            <div className="tab-content mt-2" id="nav-tabContent">
                                {isLogin && (
                                    <div>
                                        <form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
                                            <input
                                                className="form-control form-control-lg inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
                                                type="email"
                                                placeholder="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                className="form-control form-control-lg text-dark inputs-width borde-input mt-3 text-custom-paragraph2 placeholder-custom input-yellow"
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {error && <p className="text-danger">{error}</p>}

                                            <button
                                                className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom btn-hover"
                                                type="submit"
                                                style={{ fontSize: '1.2rem' }}
                                            >
                                                Iniciar sesión
                                            </button>

                                            {/* Botón de continuar con Google y Facebook */}
                                            <div className="container d-flex flex-column align-items-center mb-4 mt-3 text-custom-green"
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
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Validación, input, correo y contraseña - registro */}
                                {!isLogin && (
                                    <div className="tab-pane fade show active" id="nav-profile">
                                        <form onSubmit={handleRegister} className="d-flex flex-column align-items-center">
                                            <input
                                                className="form-control form-control-lg mb-2 inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg mb-2 text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                                className="form-control form-control-lg text-dark inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow"
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
                                            <button className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom btn-hover"
                                                type="submit"
                                                style={{
                                                    letterSpacing: '2px',
                                                    fontSize: '1.2rem',
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