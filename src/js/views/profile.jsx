import "../../styles/profile.css";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";

export const Profile = ({ className, ...props }) => {
    const navigate = useNavigate();

    // Estados para los datos del perfil
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
    const [occupation, setOccupation] = useState(localStorage.getItem("occupation") || "");
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

    // Redireccionar si no está autenticado
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate]);

    // Validar correo solo con @correo.unimet.edu.ve
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@correo\.unimet\.edu\.ve$/;  // Solo correos @correo.unimet.edu.ve
        return emailRegex.test(email);
    };

    // Guardar cambios y validaciones
    const handleSaveChanges = () => {
        if (!name || !lastName || !email || !phone || !occupation) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        if (!isValidEmail(email)) {
            alert("El correo debe ser válido y terminar en @correo.unimet.edu.ve.");
            return;
        }
        if (!isValidPhone(phone)) {
            alert("El teléfono solo debe contener números y tener entre 7 y 15 dígitos.");
            return;
        }

        // Guardar en localStorage si todo es válido
        localStorage.setItem("name", name);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("occupation", occupation);
        alert("¡Cambios guardados correctamente!");
    };


    // Cambiar foto de perfil
    const handleChangePhoto = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem("profileImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile d-flex flex-column align-items-center" 
        style={{ backgroundColor: "#fef9c3", padding: "20px", minHeight: "70vh" }}>
            {/* Contenedor de input para config, perfil. */}
            <div className="d-flex flex-column align-items-center justify-content-center"
                style={{
                    maxWidth: "70%",
                    width: "60%",
                    backgroundColor: "#f1f6aa",
                    borderRadius: "15px",
                    padding: "20px",
                    border: "3px solid #31470b",
                    position: "relative"
                }}>

                {/* Botón de cerrar */}
                <button
                    onClick={() => window.location.href = "/"}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#31470b"
                    }}>✖</button>

                {/* Título del contenedor */}
                <h2 style={{
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                    fontSize: "1.5rem",
                    color: "#31470b",
                    fontFamily: "'Bebas Neue', sans-serif"
                }}>CONFIGURACIÓN DE PERFIL</h2>

                <hr style={{ width: "100%", borderTop: "1px solid #31470b", marginTop: "50px", marginBottom: "20px" }} />

                <div className="d-flex align-items-center justify-content-center">
                    <div className="d-flex flex-column" style={{ flex: 1, marginRight: "20px" }}>
                        {/* Inputs con estados */}
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" style={inputStyle} />
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" style={inputStyle} />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" style={inputStyle} />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" style={inputStyle} />
                        <input value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Ocupación" style={inputStyle} />

                        {/* Botón para guardar cambios */}
                        <button onClick={handleSaveChanges} style={buttonStyle}>
                            Guardar Cambios
                        </button>
                    </div>

                    <div className="d-flex flex-column align-items-center" style={{ marginLeft: "20px" }}>
                        <div className="ellipse-6">
                            {profileImage ? (
                                <img src={profileImage} alt="Perfil" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4 12s1-1 4-1 4 1 4 1-1 1-4 1-4-1-4-1zm4-9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                                </svg>
                            )}
                        </div>

                        {/* Input para subir foto */}
                        <input type="file" accept="image/*" onChange={handleChangePhoto} style={{ display: "none" }} id="fileInput" />
                        <button onClick={() => document.getElementById("fileInput").click()} style={buttonStyle}>
                            Cambiar Foto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Estilos reutilizables
const inputStyle = {
    backgroundColor: "#a2a87b",
    border: "none",
    height: "40px",
    width: "350px",
    marginBottom: "10px",
    color: "#31470b",
    borderRadius: "5px",
    paddingLeft: "10px"
};

const buttonStyle = {
    width: "200px",
    height: "40px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    backgroundColor: "#31470b",
    color: "#fef9c3"
};

export default Profile;
