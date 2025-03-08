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
            <div className="d-flex flex-column align-items-center justify-content-center text-custom-green"
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
                    top: "20px",
                    left: "20px",
                    fontSize: "2rem",
                    color: "#31470b",
                }}>CONFIGURACIÓN DE PERFIL</h2>

                {/* Línea decorativa */}
                <hr style={{ width: "100%", borderTop: "3px solid #31470b", marginTop: "40px", marginBottom: "20px" }} />

                {/* Contenedor de inputs y foto */}
                <div className="d-flex align-items-center justify-content-center">
                    <div >
                        {/* Inputs con estados */}
                        <input 
                        className="d-flex flex-column inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow" 
                        style={{ flex: 1, marginRight: "20px" }}
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Nombre" 
                         />
                        <input 
                        className="d-flex flex-column inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow" 
                        style={{ flex: 1, marginRight: "20px" }}
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        placeholder="Apellido"  />
                        <input 
                        className="d-flex flex-column inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow" 
                        style={{ flex: 1, marginRight: "20px" }}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Correo" />
                        <input 
                        className="d-flex flex-column inputs-width borde-input text-custom-paragraph2 placeholder-custom input-yellow" 
                        style={{ flex: 1, marginRight: "20px" }}
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Teléfono" />

                        {/* Botón para guardar cambios */}
                        <button 
                        className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom btn-hover"
                        onClick={handleSaveChanges} 
                        style={buttonStyle}>
                            Guardar Cambios
                        </button>
                    </div>

                        <div className="d-flex flex-column align-items-center" 
                        style={{ marginLeft: "20px" }}>
                        <div 
                            className="ellipse-6" 
                            style={{ 
                                width: "100%", 
                                maxWidth: "150px", 
                                aspectRatio: "1", 
                                borderRadius: "80%", 
                                overflow: "hidden", 
                                backgroundColor: "#31470b", 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center" 
                            }}
                        >
                            {profileImage ? (
                                <img 
                                    src={profileImage} 
                                    alt="Perfil" 
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                />
                            ) : (
                                <i 
                                    className="fas fa-user" 
                                    style={{ fontSize: "min(80px, 10vw)", color: "#fef9c3" }} 
                                    aria-hidden="true" 
                                ></i>
                            )}
                        </div>

                        {/* Input para subir foto */}
                        <input type="file" accept="image/*" onChange={handleChangePhoto} style={{ display: "none" }} id="fileInput" />
                        <button 
                        className="btn bg-custom-green button-width mt-3 text-custom-green2 placeholder-custom btn-hover"
                        onClick={() => document.getElementById("fileInput").click()} 
                        style={buttonStyle}>
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
