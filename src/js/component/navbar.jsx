import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../auth.js";
import { Context } from "../store/appContext";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { store } = useContext(Context);
	const [user, setUser] = useState(null); // Estado para el usuario autenticado
	const [userRole, setUserRole] = useState("Excursionista");
	const [profilePhoto, setProfilePhoto] = useState(null); // Estado para la foto de perfil
	const isLoginView = location.pathname === "/login";

	// Imagen predeterminada si no hay foto de perfil
	const defaultProfilePhoto = "https://res.cloudinary.com/do9dtxrvh/image/upload/v1742413057/Untitled_design_1_hvuwau.png";

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser && isAuthenticated()) {
				setUser(currentUser);
				fetchUserData(currentUser.uid);
			} else {
				setUser(null);
				setProfilePhoto(null); // No mostrar foto si no hay usuario
				setUserRole("Excursionista"); // Reiniciar rol
			}
			console.log("Estado del usuario:", currentUser); // Añadido para verificar el estado de usuario
		});

		return () => unsubscribe(); // Limpiar el listener al desmontar el componente
	}, []);

	const fetchUserData = async (uid) => {
		try {
			console.log("🔍 Buscando datos en Firestore para UID:", uid);
			const userDocRef = doc(db, "users", uid);
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				setUserRole(userData.role || "Excursionista");
				setProfilePhoto(userData.fotoPerfil || defaultProfilePhoto); // Obtener fotoPerfil desde Firestore
				console.log("✅ Rol obtenido:", userData.role);
				console.log("📸 Foto de perfil obtenida:", userData.fotoPerfil || "Usando predeterminada");
			} else {
				console.log("❌ No se encontró el usuario en Firestore.");
				setProfilePhoto(defaultProfilePhoto); // Si no hay documento, usar predeterminada
			}
		} catch (error) {
			console.error("🚨 Error al obtener los datos del usuario:", error);
			setProfilePhoto(defaultProfilePhoto); // En caso de error, usar predeterminada
		}
	};

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
					<Link to="/destination" className="text-custom-paragraph text-decoration-none link-hover">
						Destino
					</Link>

					{user && (
						<Link
							to={isAdmin ? "/manage-reservations" : "/reservation"}
							className="text-custom-paragraph text-decoration-none link-hover"
						>
							{isAdmin ? "Reservas" : "Reservación"}
						</Link>
					)}

					{isAdmin && (
						<Link to="/management" className="text-custom-paragraph text-decoration-none link-hover">
							Gestionar
						</Link>
					)}

					<Link to="/forum" className="text-custom-paragraph text-decoration-none link-hover">
						Foro
					</Link>
					<Link to="/info" className="text-custom-paragraph text-decoration-none link-hover">
						Información
					</Link>
					<Link to="/gallery" className="text-custom-paragraph text-decoration-none link-hover">
						Galería
					</Link>
				</nav>

				{/* Sección de botones */}
				{!isLoginView && (
					<div
						className="d-flex mb-4 align-items-center gap-4"
						style={{ marginLeft: "5px", marginRight: "-50px", marginTop: "-10px" }}
					>
						{user ? (
							<>
								{/* Mostrar foto de perfil en lugar del botón Perfil */}
								<Link to="/profile">
									<img
										src={profilePhoto}
										alt="Foto de perfil"
										className="rounded-circle"
										style={{ width: "60px", height: "60px", objectFit: "cover", border: "2px solid #2e4e1e" }}
									/>
								</Link>
								<button
									onClick={handleLogout}
									className="btn-logout"
									style={{ background: "none", border: "none", padding: 0 }}
								>
									<img
										src="https://res.cloudinary.com/do9dtxrvh/image/upload/v1742317260/Untitled_design_1_rhkoqu.png"
										alt="Cerrar sesión"
										className="logout-icon"
										style={{ background: "none", border: "none", padding: 0, width: "111px", height: "111px" }}
									/>
								</button>
							</>
						) : (
							<div className="d-flex align-items-center mb-4 gap-4">
								<Link to="/login">
									<button
										className="btn btn-success bg-custom-green text-white text-custom-paragraph2"
										style={{ fontSize: "1rem" }}
									>
										Iniciar sesión
									</button>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;