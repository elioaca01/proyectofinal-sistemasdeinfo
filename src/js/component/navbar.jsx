import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../auth.js";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const user = isAuthenticated();
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const handleRestrictedAccess = () => {
        alert("Debes registrarte o iniciar sesión para acceder a esta función.");
        navigate("/login");
    };

	{/*
	const goToProfile = () => {
		if (isAuthenticated()) {
			navigate("/profile");
		} else {
			navigate("/login");
		}
	};{*/}

	// No mostrar botones si estás en la vista de login
	const isLoginView = location.pathname === "/login";

	return (
		<nav className="py-3 bg-custom-yellow" 
		style={{ height: "100px"}}>
			<div className="container d-flex justify-content-between align-items-center">
				{/* Contenedor para los logos */}
				<div className="d-flex align-items-center ">
					<img
						alt="Logo de la Universidad Metropolitana"
						className="logo-universidad pb-1"
						style={{ marginTop: "-18px" }} 
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"
					/>
					<img
						alt="Logo de Avilamet"
						className="logo ms-4"
						style={{ marginTop: "-18px" }} 
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
					/>
				</div>
				{/* Contenedor para los enlaces de navegación */}
				<nav className="d-none d-md-flex align-items-center gap-5 fw-bold "
				style={{ marginLeft: "100px", marginRight: "100px", marginTop: "-18px" }}>
					<Link to="/" className="text-custom-green text-decoration-none link-hover"
					style={{ fontSize: '2rem' }}
					>Destino</Link>
					<Link to="/" className="text-custom-green text-decoration-none link-hover"
					style={{ fontSize: '2rem' }}
					>Reservación</Link>
					<Link to="/" className="text-custom-green text-decoration-none link-hover"
					style={{ fontSize: '2rem' }}
					>Foro</Link>
					<Link to="/" className="text-custom-green text-decoration-none link-hover"
					style={{ fontSize: '2rem' }}
					>Información</Link>
				</nav>
				{/* Contenedor para los botones de perfil y cerrar sesión */}
				{!isLoginView && (
					<div className="d-flex align-items-center gap-4 justify-content-end w-100">
						{user ? (
							<>
								{/* SI ESTA REGISTRADO  */}
								{location.pathname !== "/profile" && (
									<Link to="/profile">
										<button className="btn btn-success bg-custom-green text-custom-paragraph2 btn-hover"
										style={{ width: "150px", height: "50px", fontWeight: "bold", 
											marginLeft: "10px", marginRight: "5px", marginTop: "-18px"}}>
											Perfil
										</button>
									</Link>
								)}
								<button 
								onClick={handleLogout} 
								className="btn btn-danger text-custom-paragraph2 btn-hover"
								style={{ width: "150px", height: "50px", fontWeight: "bold", 
									marginLeft: "10px", marginRight: "5px", marginTop: "-18px"}}>
									Cerrar sesión
								</button>
							</>
						) : (
							<>
							{/* SI NO ESTA LOGEADO*/}
								<Link to="/login">
									<button className="btn btn-success bg-custom-green text-custom-paragraph2 btn-hover"
									style={{ width: "150px", height: "50px", fontWeight: "bold", 
									marginLeft: "10px", marginRight: "5px", marginTop: "-18px"}}>
										Iniciar sesión
									</button>
									</Link>
								<Link to="/login">
								<button className="btn btn-primary bg-custom-yellow text-custom-paragraph btn-hover"
								style={{ width: "150px", height: "50px", fontWeight: "bold", 
									marginLeft: "5px", marginRight: "20px", marginTop: "-18px",
									border: "3px solid #31470b"}}>
								Registrarse
								</button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};