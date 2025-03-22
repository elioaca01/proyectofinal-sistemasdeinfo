import React from "react";
import { useNavigate } from "react-router-dom";

const Management_G = () => {
    const navigate = useNavigate();
    const goToManageActiveExcursions = () => navigate("/manage_active_excursions");
    const goToManageCompletedExcursions = () => navigate("/manage_completed_excursions");

    return (
        <div className="d-flex flex-column align-items-center my-4" style={{ width: "100%" }}>
            <p className
                style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "20px",
                    color: "#000",
                    lineHeight: "1.6",
                    textAlign: "justify",
                }}>
                Selecciona una de las opciones a gestionar:
            </p>
            <button
                className="btn btn-primary mb-3"
                style={{
                    backgroundColor: "#09490e",
                    border: "2px solid #09490e",
                    color: "#fbfada",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "1px"
                }}
                onClick={goToManageActiveExcursions}
            >
                Activas
            </button>

            <button
                className="btn btn-secondary mb-3"
                style={{
                    backgroundColor: "#09490e",
                    border: "2px solid #09490e",
                    color: "#fbfada",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "1px"
                }}
                onClick={goToManageCompletedExcursions}
            >
                Historial
            </button>
        </div>
    );
}

export default Management_G;