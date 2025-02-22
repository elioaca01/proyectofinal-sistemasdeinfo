import React from "react";
import "../../styles/home.css";

export const Home = () => {
	return(
		<div className="container-fluid">
				<section className="position-relative" style="height: 50vh;">
					<img alt="Imagen de montañas" className="w-100 h-100 object-cover" src="imagenes/header.jpg"/>
					<div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-50">
						
						<div className="d-flex flex-column flex-md-row justify-content-between w-100 px-4">
							
							<h1 className="display-5 fw-bold text-center text-md-start col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-green">VIVE LA AVENTURA</h1>
							
							<p className="lead mt-2 text-justify text-md-end col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-green" style="max-width: 30%;">Viva los detalles de las mejores caminatas, vistas y lugares secretos del parque nacional Ávila.</p>
						</div>
						
						<input className="mt-4 px-4 py-2 rounded-lg bg-custom-green text-white" placeholder="Buscar por..." type="text" style="width: 20%;"/>
					</div>
				</section>

			
			<section className="py-5 bg-custom-yellow">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-md-4 text-center">
							<img alt="Logo de Avilamet" className="img-fluid" src="imagenes/avilamet-removebg-preview.png"/>
						</div>
						<div className="col-md-8">
							<div className="mb-5">
								<h2 className="h2 fw-bold text-custom-green">MISIÓN</h2>
								<p className="mt-3 text-dark">
									Fomentar la relación entre los estudiantes de la Universidad Metropolitana y el Avila, su vida, su diversidad ambiental y su uso. Promover el disfrute al aire libre, el cuidado del medio ambiente y el compromiso con la comunidad.
								</p>
							</div>
							<div>
								<h2 className="h2 fw-bold text-custom-green">VISIÓN</h2>
								<p className="mt-3 text-dark">
									Ser una plataforma confiable para los estudiantes que deseen explorar el Avila, promoviendo experiencias únicas e integradoras que fortalezcan el sentido de pertenencia y el compromiso ambiental en la comunidad universitaria.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			
			<section className="py-5 bg-custom-green text-white">
				<div className="container text-center">
					<h2 className="display-5 fw-bold mb-5">DESCUBRE LAS MEJORES RUTAS</h2>
					<div className="row g-4 ">
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de Sabas Nieves" className="w-100 h-70 object-cover rounded" src="imagenes/sabasnieves.jpeg"/>
								<h3 className="mt-4 h4 fw-bold text-custom-green">Sabas Nieves</h3>
								<p className="mt-2 text-custom-green">Ruta fácil - 1.5 km - 1 hora</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de Lagunazo" className="w-100 h-70 object-cover rounded" src="imagenes/lagunazo.jpeg"/>
								<h3 className="mt-4 h4 fw-bold text-custom-green">Lagunazo</h3>
								<p className="mt-2 text-custom-green">Ruta moderada - 6.4 km - 4 horas</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de El Banquito" className="w-100 h-70 object-cover rounded" src="imagenes/elbanquito.jpg"/>
								<h3 className="mt-4 h4 fw-bold text-custom-green">El Banquito</h3>
								<p className="mt-2 text-custom-green">Ruta difícil - 16.8 km - 8 horas</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de Pico Naiguatá" className="w-100 h-70 object-cover rounded" src="imagenes/piconaiguata.jpg"/>
								<h3 className="mt-4 h4 fw-bold text-custom-green">Pico Naiguatá</h3>
								<p className="mt-2 text-custom-green">Ruta extrema - 15 km - 12 horas</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			
			<section className="py-5 bg-custom-yellow">
				<div className="container">
					<div className="row align-items-center bg-custom-green text-white p-4 rounded-lg">
						<div className="col-md-4 text-center">
							<img alt="Imagen de descuento" className="img-fluid rounded-lg" src="imagenes/descuento.jpg"/>
						</div>
						<div className="col-md-8">
							<h2 className="display-5 fw-bold text-center">20% DESCUENTO</h2>
							<p className="mt-3 text-center">
								Si vas con amigos a una de nuestras excursiones, obtendrás un descuento del 20%. ¡Aprovecha esta promoción y vive la aventura!
							</p>
						</div>
					</div>
				</div>
			</section>

		
			<section className="py-5 bg-custom-yellow">
				<div className="container">
					<h2 className="display-5 fw-bold text-custom-green mb-4">Comparte tu aventura</h2>
					<p className="text-dark text-center mb-5 text-md-start">
						¡Muéstranos cómo vas de aventura etiquetándonos con #ViveTuAventura en @AvilaMet para tener la oportunidad de aparecer en la lista!
					</p>
					<div className="row g-4 bg-custom-green p-4 rounded-lg">
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte1" className="w-100 h-70 object-cover rounded" src="imagenes/"/>
								
								<p className="mt-2 text-custom-green">@DanielFuentes</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte2" className="w-100 h-70 object-cover rounded" src="imagenes/fotode-comparte tu aventura2.jpg"/>
								
								<p className="mt-2 text-custom-green">@AngelicaB</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte3" className="w-100 h-70 object-cover rounded" src="imagenes/fotode-comparte tu aventura3.jpeg"/>
								
								<p className="mt-2 text-custom-green">@Andrea_Diaz</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte4" className="w-100 h-70 object-cover rounded" src="imagenes/fotode-comparte tu aventura4.jpg"/>
								<p className="mt-2 text-custom-green">@azuaje</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
};
