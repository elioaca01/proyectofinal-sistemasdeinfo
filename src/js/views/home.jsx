import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { isAuthenticated, logout } from "../auth.js";
import "../../styles/home.css";

// Separate SearchBar component
const SearchBar = ({ availablePages }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const navigate = useNavigate();

	const handleSearch = (event) => {
		const value = event.target.value;
		setSearchTerm(value);

		if (value.trim() === '') {
			setResults([]);
		} else {
			const matches = availablePages.filter(page =>
				page.name.toLowerCase().includes(value.toLowerCase()) ||
				page.display.toLowerCase().includes(value.toLowerCase())
			);
			setResults(matches);
		}
	};

	return (
		<div className="w-100 d-flex justify-content-center flex-column align-items-center"
			style={{ position: 'absolute', bottom: '20px' }}>
			<input
				className="px-4 py-2 rounded-lg bg-custom-green"
				style={{ width: '40%', height: '50px', color: '#FFFFFF' }}
				placeholder="Search by..."
				type="text"
				value={searchTerm}
				onChange={handleSearch}
			/>
			{results.length > 0 && (
				<div
					className="mt-2 bg-white rounded-lg shadow-lg"
					style={{
						width: '40%',
						maxHeight: '200px',
						overflowY: 'auto',
						color: '#000000'
					}}
				>
					{results.map((page, index) => (
						<div
							key={index}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-custom-green"
							style={{ color: '#006400' }}
							onClick={() => {
								const pageName = page.name.replace('.jsx', '');
								navigate(`/${pageName}`);
							}}
						>
							{page.display} {/* Mostrar texto personalizado */}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const Home = () => {
	const navigate = useNavigate();
	const user = isAuthenticated();

	const goToProfile = () => {
		if (isAuthenticated()) {
			navigate("/profile");
		} else {
			navigate("/login");
		}
	};

	const availablePages = [
		{ name: 'forum.jsx', display: 'Foro' },
		{ name: 'information.jsx', display: 'Información' },
		{ name: 'destination.jsx', display: 'Destinos' },
		{ name: 'profile.jsx', display: 'Perfil' },
		{ name: 'reservation.jsx', display: 'Reservaciones' },
		{ name: 'gallery.jsx', display: 'Galería' },
	];

	return (
		<div className="principal w-100">
			{/* Background image section with title and search */}
			<section className="position-relative">
				<img
					alt="Mountain image"
					className="w-100 h-100 object-cover"
					src='https://res.cloudinary.com/dntc8trob/image/upload/v1740262967/imagen-header_xgih0d.jpg'
				/>
				<div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-50"
					style={{ padding: '0 40px' }}>
					<div className="d-flex flex-column flex-md-row justify-content-between w-100 px-4">
						{/* Main title */}
						<h1 className="display-5 fw-bold text-center text-md-start col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-green"
							style={{ fontSize: '6rem', letterSpacing: '5px' }}>
							LIVE THE<br /> ADVENTURE
						</h1>
						{/* Main paragraph */}
						<p className="lead mt-2 text-justify text-md-end col-sm-12 col-md-6 col-lg-6 col-xl-6 text-custom-paragraph"
							style={{ fontSize: '2rem' }}>
							Experience the details of the best hikes, views, and secret spots of Ávila National Park.
						</p>
					</div>
					{/* Search bar */}
					<SearchBar availablePages={availablePages} />
				</div>
			</section>

			{/* Mission Vision Section */}
			<section className="py-5 bg-custom-yellow">
				<div className="container h-100">
					<div className="row align-items-center h-100">
						{/* Logo Image */}
						<div className="col-md-4 text-center">
							<img
								alt="Avilamet Logo"
								className="img-fluid"
								src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
								style={{ height: '400px', width: '800px' }}
							/>
						</div>
						{/* Mission and Vision */}
						<div className="col-md-8">
							<div className="mb-5">
								<h2 className="h2 fw-bold text-custom-green"
									style={{ fontSize: '3rem' }}>MISSION</h2>
								<p className="mt-3 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>
									Foster the relationship between Metropolitan University students and Ávila, its life, environmental diversity, and use. Promote outdoor enjoyment, environmental care, and community commitment.
								</p>
							</div>
							<div>
								<h2 className="h2 fw-bold text-custom-green"
									style={{ fontSize: '3rem' }}>VISION</h2>
								<p className="mt-3 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>
									Be a reliable platform for students wishing to explore Ávila, promoting unique and inclusive experiences that strengthen the sense of belonging and environmental commitment in the university community.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Best Routes Section */}
			<section className="py-5 bg-custom-green text-white">
				<div className="container text-center">
					<h2 className="display-5 fw-bold mb-5 text-custom-green2"
						style={{ fontSize: '6rem', letterSpacing: '5px', position: 'relative' }}>
						DISCOVER THE BEST ROUTES
						<div style={{ position: 'absolute', bottom: '-10px', left: '0', width: '100%', height: '5px', background: '#fef9c3' }}></div>
					</h2>
					<div className="row g-4">
						{/* Routes */}
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img
									alt="Sabas Nieves Image"
									className="w-100 h-70 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263845/WhatsApp_Image_2025-02-22_at_5.51.47_PM_ouyvmq.jpg"
									style={{ width: '300px', height: '300px' }}
								/>
								<h3 className="mt-4 h4 fw-bold text-custom-paragraph"
									style={{ fontSize: '2rem' }}>Sabas Nieves</h3>
								<p className="mt-2 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>★4.8 - 3.9 km - Medium</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img
									alt="Lagunazo Image"
									className="w-100 h-70 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263972/imagen2_kcfy9a.jpg"
									style={{ width: '300px', height: '300px' }}
								/>
								<h3 className="mt-4 h4 fw-bold text-custom-paragraph"
									style={{ fontSize: '2rem' }}>Lagunazo</h3>
								<p className="mt-2 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>★4.8 - 6.4 km - Hard</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img
									alt="El Banquito Image"
									className="w-100 h-70 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263703/imagen1_hj9bx0.jpg"
									style={{ width: '300px', height: '300px' }}
								/>
								<h3 className="mt-4 h4 fw-bold text-custom-paragraph"
									style={{ fontSize: '2rem' }}>El Banquito</h3>
								<p className="mt-2 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>★4.6 - 18.8 km - Hard</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg">
								<img
									alt="Pico Naiguatá Image"
									className="w-100 h-70 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263980/imagen3_gj2ztl.jpg"
									style={{ width: '300px', height: '300px' }}
								/>
								<h3 className="mt-4 h4 fw-bold text-custom-paragraph"
									style={{ fontSize: '2rem' }}>Pico Naiguatá</h3>
								<p className="mt-2 text-custom-paragraph"
									style={{ fontSize: '1.5rem' }}>★4.2 - 16.4 km - Hard</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Discounts Section */}
			<section className="py-5 bg-custom-yellow">
				<div className="container">
					<div className="row align-items-center bg-custom-green text-white p-4 rounded-lg">
						<div className="col-md-4 text-center">
							<img
								alt="Discount Image"
								className="img-fluid rounded-lg"
								src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264083/WhatsApp_Image_2025-02-22_at_5.51.47_PM_1_sh9dum.jpg"
								style={{ width: '400px', height: '400px' }}
							/>
						</div>
						<div className="col-md-8">
							<h2 className="display-5 fw-bold text-custom-green2 text-center"
								style={{ fontSize: '6rem' }}>20% DISCOUNT</h2>
							<p className="mt-3 text-center text-custom-paragraph2"
								style={{ fontSize: '2rem' }}>
								If you go with friends on one of our excursions, you'll get a 20% discount.<br /><br />Take advantage of this promotion and live the adventure!
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Share Your Adventure Section */}
			<section className="py-5 bg-custom-yellow">
				<div className="container">
					<h2 className="display-5 fw-bold text-custom-green mb-4"
						style={{ fontSize: '4rem' }}>Share Your Adventure</h2>
					<p className="text-center mb-5 text-md-start text-custom-paragraph"
						style={{ fontSize: '1.5rem' }}>
						Show us how you adventure by tagging us with #LiveYourAdventure at @AvilaMet for a chance to be featured!
					</p>
					<div className="row g-4 bg-custom-green p-4 rounded-lg">
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg"
								style={{ width: '300px', height: '320px' }}>
								<img
									alt="Share Image 1"
									className="w-100 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740326155/WhatsApp_Image_2025-02-23_at_10.36.07_AM_hb8a8x.jpg"
									style={{ width: '300px', height: '250px', objectFit: 'cover' }}
								/>
								<p className="mt-2 text-custom-green">@DanielFuentes</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg"
								style={{ width: '300px', height: '320px' }}>
								<img
									alt="Share Image 2"
									className="w-100 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264151/WhatsApp_Image_2025-02-22_at_5.51.47_PM_2_c6asdo.jpg"
									style={{ width: '300px', height: '250px', objectFit: 'cover' }}
								/>
								<p className="mt-2 text-custom-green">@AngelicaB</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg"
								style={{ width: '300px', height: '320px' }}>
								<img
									alt="Share Image 3"
									className="w-100 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264366/WhatsApp_Image_2025-02-22_at_5.51.47_PM_4_lvvfmf.jpg"
									style={{ width: '300px', height: '250px', objectFit: 'cover' }}
								/>
								<p className="mt-2 text-custom-green">@Andrea_Diaz</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="bg-custom-yellow p-4 rounded-lg"
								style={{ width: '300px', height: '320px' }}>
								<img
									alt="Share Image 4"
									className="w-100 object-cover rounded"
									src="https://res.cloudinary.com/dntc8trob/image/upload/v1740264227/WhatsApp_Image_2025-02-22_at_5.51.47_PM_3_f0yj63.jpg"
									style={{ width: '300px', height: '250px', objectFit: 'cover' }}
								/>
								<p className="mt-2 text-custom-green">@azuaje</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;