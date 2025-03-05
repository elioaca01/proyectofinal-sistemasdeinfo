import React,{useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const {store,actions} = useContext(Context)
	return (
		<nav className="py-3 bg-custom-yellow">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<img alt="Logo de la Universidad Metropolitana" className="logo-universidad pb-1" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"/>
					<img alt="Logo de Avilamet" className="logo ms-4" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"/>
				</div>

				<nav className="d-none d-md-flex align-items-center gap-3 fw-bold">
					<Link to='/' className="text-decoration-none">
						<span  className="text-custom-green text-decoration-none" >Destino</span >
					</Link>
					<Link to='/' className="text-decoration-none">
						<span  className="text-custom-green text-decoration-none" >Reservación</span >
					</Link>
					<Link to='/' className="text-decoration-none">
						<span  className="text-custom-green text-decoration-none">Foro</span >
					</Link>
					<Link to="" className="text-decoration-none" >
						<span  className="text-custom-green text-decoration-none" >Información</span >
					</Link>
					<Link to="" className="text-decoration-none">
						<span  className="text-custom-green text-decoration-none">Sobre Avilamet</span>
					</Link>
				</nav>

				{store.token? 
					<div className="d-flex align-items-center gap-4">
					<Link to="/">
						<button className="btn btn-success bg-custom-green" onClick={()=>actions.close()} >Cerrar sesión</button>
					</Link>
					</div>:
					 <div className="d-flex align-items-center gap-4">
					 <Link to="/login">
					 	<button className="btn btn-success bg-custom-green">Iniciar sesión</button>
					</Link>
					 </div>
				}		 
			</div>
		</nav>
		
	)
};
