import React from "react";
import "../../styles/home.css";

export const Home = () => {
	return (
		<div className="principal w-100">  
		{/* Sección de la imagen de fondo con el título y el buscador*/}
			<section className="position-relative">
				<img alt="Imagen de montañas" className="w-100 h-100 object-cover" src='https://res.cloudinary.com/dntc8trob/image/upload/v1740262967/imagen-header_xgih0d.jpg' />
				<div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-50"style={{ padding: '0 40px' }}>
					<div className="d-flex flex-column flex-md-row justify-content-between w-100 px-4">
						{/*Titulo principal*/}
						<h1 className="display-5 fw-bold text-center text-md-start col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-green"style={{ fontSize: '6rem' }}>VIVE LA<br /> AVENTURA</h1>
						{/*Parrafo principal*/}
						<p className="lead mt-2 text-justify text-md-end col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-paragraph"style={{ fontSize: '2rem' }}>Viva los detalles de las mejores caminatas, vistas y lugares secretos del parque nacional Ávila.</p>
					</div>
						{/*Buscar*/}
					<div className="w-100 d-flex justify-content-center" style={{ position: 'absolute', bottom: '20px' }}>
                        <input className="px-4 py-2 rounded-lg bg-custom-green text-custom-paragraph" style={{ width: '40%', height: '50px' }} placeholder="Buscar por..." type="text-custom-paragraph" />
                    </div>
				</div>
			</section>

			{/* Sección de Mision Vision*/}
			<section className="py-5 bg-custom-yellow"style={{ width: '1440px', height: '600px' }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
						{/*Imagen Logo*/}
						<div className="col-md-4 text-center">
							<img alt="Logo de Avilamet" className="img-fluid" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png" 
							style={{height: '400px', width: '500px' }} />
						</div>
						{/*Mision y Vision*/}
						<div className="col-md-8">
							<div className="mb-5">
								<h2 className="h2 fw-bold text-custom-green"style={{ fontSize: '3rem' }}>MISIÓN</h2>
								<p className="mt-3 text-custom-paragraph">
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
								<img alt="Imagen de Sabas Nieves" className="w-100 h-70 object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263845/WhatsApp_Image_2025-02-22_at_5.51.47_PM_ouyvmq.jpg" />
								<h3 className="mt-4 h4 fw-bold text-custom-green">Sabas Nieves</h3>
								<p className="mt-2 text-custom-green">Ruta fácil - 1.5 km - 1 hora aprox</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de Lagunazo" className="w-100 h-70 object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263972/imagen2_kcfy9a.jpg" />
								<h3 className="mt-4 h4 fw-bold text-custom-green">Lagunazo</h3>
								<p className="mt-2 text-custom-green">Ruta moderada - 6.4 km - 4 horas</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de El Banquito" className="w-100 h-70 object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263703/imagen1_hj9bx0.jpg" />
								<h3 className="mt-4 h4 fw-bold text-custom-green">El Banquito</h3>
								<p className="mt-2 text-custom-green">Ruta difícil - 16.8 km - 8 horas</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de Pico Naiguatá" className="w-100 h-70 object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263980/imagen3_gj2ztl.jpg" />
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
							<img alt="Imagen de descuento" className="img-fluid rounded-lg" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264083/WhatsApp_Image_2025-02-22_at_5.51.47_PM_1_sh9dum.jpg" />
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
								<img alt="Imagen de comparte1" className="w-100  object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740326155/WhatsApp_Image_2025-02-23_at_10.36.07_AM_hb8a8x.jpg" />

								<p className="mt-2 text-custom-green">@DanielFuentes</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte2" className="w-100  object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264151/WhatsApp_Image_2025-02-22_at_5.51.47_PM_2_c6asdo.jpg" />

								<p className="mt-2 text-custom-green">@AngelicaB</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte3" className="w-100  object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264366/WhatsApp_Image_2025-02-22_at_5.51.47_PM_4_lvvfmf.jpg" />

								<p className="mt-2 text-custom-green">@Andrea_Diaz</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img alt="Imagen de comparte4" className="w-100 object-cover rounded" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264227/WhatsApp_Image_2025-02-22_at_5.51.47_PM_3_f0yj63.jpg" />
								<p className="mt-2 text-custom-green">@azuaje</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
};
