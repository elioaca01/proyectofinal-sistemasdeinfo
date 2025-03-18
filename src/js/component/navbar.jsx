import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../auth.js";
import { Context } from "../store/appContext";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const user = isAuthenticated();
	const { store } = useContext(Context);
	const [userRole, setUserRole] = useState("Excursionista");
	const isLoginView = location.pathname === "/login";

	useEffect(() => {
		const fetchUserRole = async () => {
			if (user) {
				try {
					console.log("🔍 Buscando rol en Firestore...");
					const userDocRef = doc(db, "users", auth.currentUser.uid);
					const userDocSnap = await getDoc(userDocRef);

					if (userDocSnap.exists()) {
						const userData = userDocSnap.data();
						setUserRole(userData.role || "Excursionista");
						console.log("✅ Rol obtenido:", userData.role);
					} else {
						console.log("❌ No se encontró el usuario en Firestore.");
					}
				} catch (error) {
					console.error("🚨 Error al obtener el rol del usuario:", error);
				}
			}
		};

		fetchUserRole();
	}, [user]);

	const isAdmin = user && userRole === "Admin";

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="py-3 bg-custom-yellow" style={{ height: "100px" }}>
			<div className="container d-flex justify-content-between align-items-center">
				{/* Contenedor para los logos */}
				<div className="d-flex align-items-center">
					<img
						alt="Logo de la Universidad Metropolitana"
						className="logo-universidad pb-1"
						style={{
							marginTop: "-25px",
							marginLeft: "-70px",
						}}
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"
					/>
					<Link to="/">
						<img
							alt="Logo de ÁvilaMet"
							className="logo-universidad pb-1"
							src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
							style={{ marginTop: "-25px", width: "140px", height: "140px" }}
						/>
					</Link>
				</div>

				{/* Contenedor para los enlaces de navegación */}
				<nav
					className="d-none d-md-flex align-items-center gap-5 fw-bold"
					style={{ marginLeft: "30px", marginRight: "50px", marginTop: "-25px", fontSize: "1.7rem" }}
				>
					<Link to="/destination" className="text-custom-paragraph text-decoration-none link-hover" >
						Destino
					</Link>

					{/* Si el usuario es admin, mostrar "Reservas", si no, "Reservación" */}
					{user && (
						<Link to={isAdmin ? "/manage-reservations" : "/reservation"}
							className=" text-custom-paragraph text-decoration-none link-hover"

						>
							{isAdmin ? "Reservas" : "Reservación"}
						</Link>
					)}

					{/* Si el usuario es admin, mostrar "Crear Guía" */}
					{isAdmin && (
						<Link to="/management" className="text-custom-paragraph text-decoration-none link-hover">
							Gestionar
						</Link>
					)}

					<Link to="/forum" className="text-custom-paragraph text-decoration-none link-hover"
					>
						Foro
					</Link>
					<Link to="/info" className="text-custom-paragraph text-decoration-none link-hover"
					>
						Información
					</Link>
					<Link to="/gallery" className="text-custom-paragraph text-decoration-none link-hover"
					>
						Galería
					</Link>

				</nav>

				{/* Sección de botones */}
				{!isLoginView && (
					<div className="d-flex mb-4 align-items-center gap-4"
						style={{ marginLeft: "5px", marginRight: "-50px", marginTop: "-10px" }}>
						{user ? (
							<>
								{/* Mostrar botón Perfil solo si NO estás en /profile */}
								{location.pathname !== "/profile" && (
									<Link to="/profile">
										<button className="btn btn-success bg-custom-green text-white text-custom-paragraph2"
											style={{ fontSize: "1rem" }}>
											Perfil</button>
									</Link>
								)}
								<button onClick={handleLogout} className="btn-logout" style={{ background: "none", border: "none", padding: 0 }}>
									<img src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1742317260/Untitled_design_1_rhkoqu.png"
										alt="Cerrar sesión" className="logout-icon"
										style={{ background: "none", border: "none", padding: 0, width: "80px", height: "80px" }} />
								</button>
							</>
						) : (
							<div className="d-flex align-items-center mb-4 gap-4">
								<Link to="/login">
									<button className="btn btn-success bg-custom-green text-white text-custom-paragraph2"
										style={{ fontSize: "1rem" }}
									>Iniciar sesión</button>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}