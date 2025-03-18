import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth.js";

const Manage_Routes = () => {
    const navigate = useNavigate();

    return (<div className="d-flex flex-column align-items-center my-4" style={{ width: "100%" }}>
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
    </div>
    );
}
export default Manage_Routes;