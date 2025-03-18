import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth.js";

const Management = () => {
  const navigate = useNavigate();

  const goToManageGuides = () => {
    navigate("/manage_guides");
  };

  const goToManageExcursions = () => {
    navigate("/manage_excursions");
  };

  const goToManageRoutes = () => {
    navigate("/manage_routes");
  };

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
        onClick={goToManageGuides}
      >
        Guías
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
        onClick={goToManageExcursions}
      >
        Excursiones
      </button>

      <button
        className="btn btn-third"
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
        onClick={goToManageRoutes}
      >
        Destinos
      </button>
    </div>
  );
}
export default Management;