import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home.jsx";
import Login from "./views/login.jsx";
import Profile from "./views/profile.jsx";
import Reservation from "./views/reservation.jsx";
import Destination from "./views/destination.jsx";
import Information from "./views/information.jsx";
import Forum from "./views/forum.jsx";
import Gallery from "./views/gallery.jsx";
import Management from "./views/management.jsx";
import Manage_Guides from "./views/manage_guides.jsx";
import Manage_Excursions from "./views/manage_excursions.jsx";
import Manage_Routes from "./views/manage_routes.jsx";
import injectContext from "./store/appContext.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	// const basename = process.env.BASENAME || "";
	const basename = import.meta.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>

				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/reservation" element={<Reservation />} />
						<Route path="/destination" element={<Destination />} />
						<Route path="/info" element={<Information />} />
						<Route path="/forum" element={<Forum />} />
						<Route path="/gallery" element={<Gallery />} />
						<Route path="/management" element={<Management />} />
						<Route path="/manage_guides" element={<Manage_Guides />} />
						<Route path="/manage_routes" element={<Manage_Routes />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
